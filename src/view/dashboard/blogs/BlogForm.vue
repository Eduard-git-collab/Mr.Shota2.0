<template>
  <div class="flex flex-col gap-6 rounded-3xl border border-slate-700 bg-slate-800/70 backdrop-blur p-6 shadow-2xl text-slate-100">
    <!-- HEADER -->
    <header class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
      <h2 class="text-xl font-bold tracking-wide text-slate-100">
        {{ isEdit ? 'Edit Blog' : 'New Blog' }}
      </h2>
      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          @click="openPreview"
          :disabled="saving || generatingPreview"
          class="px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-md bg-slate-500 hover:bg-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ generatingPreview ? 'Preparing…' : 'Preview' }}
        </button>
        <button
          @click="saveDraft"
          :disabled="saving"
          class="px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-md bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ saving ? 'Saving...' : 'Save Draft' }}
        </button>
        <button
          @click="showScheduleModal = true"
          :disabled="saving"
          class="px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Publish Later
        </button>
        <button
          @click="publish"
          :disabled="saving"
          class="px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ saving ? 'Publishing…' : 'Publish Now' }}
        </button>
      </div>
    </header>

    <form @submit.prevent="saveDraft" class="flex flex-col gap-8 relative">
      <!-- META -->
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-300">Title *</label>
            <input
              v-model="form.title"
              required
              maxlength="140"
              class="w-full rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-slate-300 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
            />
        </div>

        <!-- TEMPLATE SELECTION -->
        <div class="flex flex-col gap-2">
          <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-300 flex items-center justify-between">
            Block Template
            <span v-if="appliedTemplateName" class="text-[10px] font-normal text-slate-400">
              Applied: {{ appliedTemplateName }}
            </span>
          </label>
          <div class="flex gap-2">
            <select
              v-model="selectedTemplateId"
              class="flex-1 rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-xs font-medium tracking-wide text-slate-100 focus:border-slate-300 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
            >
              <option value="">-- Select template --</option>
              <option
                v-for="t in templates"
                :key="t.id"
                :value="t.id"
              >
                {{ t.name }}
              </option>
            </select>
            <button
              type="button"
              :disabled="!selectedTemplateId || applyingTemplate"
              @click="applyTemplate"
              class="rounded-md bg-emerald-600 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {{ applyingTemplate ? 'Applying...' : 'Apply' }}
            </button>
          </div>
          <p v-if="templateApplyMessage" class="text-[10px] text-slate-400 mt-1">
            {{ templateApplyMessage }}
          </p>
        </div>
      </div>

      <!-- COVER -->
      <div class="flex flex-col gap-2">
        <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-300">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          @change="onCoverChange"
          class="w-full rounded-lg border border-slate-600 bg-slate-700 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-slate-100 hover:file:bg-slate-400 text-slate-200"
        />
        <div v-if="coverPreview" class="relative mt-3 inline-block">
          <img
            :src="coverPreview"
            alt="Cover preview"
            class="max-w-xs rounded-xl border border-slate-600 object-cover shadow-lg"
          />
          <button
            type="button"
            class="absolute top-2 right-2 rounded-md bg-red-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow hover:bg-red-500"
            @click="removeCover"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- BLOCK EDITOR -->
      <div class="relative rounded-2xl border border-slate-700 bg-slate-900/40 p-4 backdrop-blur-md">
        <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 class="text-base font-semibold text-slate-100">Content Blocks</h3>
            <p class="text-[11px] uppercase tracking-wide text-slate-400">
              Drag to reorder. Markdown links: [text](https://url). Toggle "Hotlink" to add a block to the side navigation.
            </p>
            <p v-if="appliedTemplateName" class="text-[10px] text-emerald-400 mt-1">
              Template applied: {{ appliedTemplateName }} (you can still edit freely)
            </p>
          </div>
        </div>

        <div v-if="!blocks.length" class="mb-4 italic text-sm text-slate-500">
          No blocks yet. Add your first block below or apply a template.
        </div>

        <!-- DRAG CONTAINER -->
        <div
          class="blocks-scroll flex max-h-[65vh] flex-col gap-4 overflow-auto pr-1"
          @dragover.prevent="onBlocksDragOver"
          @drop.prevent="onBlocksDrop"
        >
          <div
            v-for="(block, idx) in blocks"
            :key="block.localKey"
            :data-index="idx"
            draggable="true"
            @dragstart="onBlockDragStart($event, idx)"
            @dragenter.prevent="onBlockDragEnter($event, idx)"
            @dragend="onBlockDragEnd"
            :class="[
              'group border border-slate-700 rounded-xl bg-slate-800/60 shadow-sm transition relative',
              dragState.draggingIndex===idx && 'opacity-60 border-dashed',
              dragState.overIndex===idx && dragState.draggingIndex!==idx && 'border-blue-500 ring-2 ring-blue-500/30'
            ]"
          >
            <!-- BLOCK HEADER -->
            <div class="flex flex-wrap items-center justify-between gap-3 rounded-t-xl bg-slate-800/70 px-3 py-2">
              <div class="flex flex-wrap items-center gap-3">
                <span class="cursor-grab select-none text-slate-500 hover:text-slate-300" title="Drag to reorder">⋮⋮</span>
                <span class="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                  {{ labelFor(block) }}
                </span>
                <span class="text-[10px] text-slate-500">#{{ idx+1 }}</span>

                <!-- HOTLINK TOGGLE -->
                <label
                  class="inline-flex cursor-pointer items-center gap-1 rounded-md bg-slate-700/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300"
                  :title="block.content.includeInToc ? 'This block appears in TOC' : 'Add to TOC'"
                >
                  <input
                    type="checkbox"
                    class="h-3 w-3 accent-blue-500"
                    v-model="block.content.includeInToc"
                    @change="onToggleHotlink(block)"
                  />
                  <span>Hotlink</span>
                </label>

                <span
                  v-if="dragState.overIndex===idx && dragState.draggingIndex!==idx"
                  class="text-[10px] font-semibold tracking-wide text-blue-400"
                >
                  Drop {{ dragState.draggingIndex < idx ? 'after' : 'before' }}
                </span>
              </div>
              <div class="flex gap-1">
                <button
                  type="button"
                  @click="moveBlock(idx, -1)"
                  :disabled="idx===0"
                  class="rounded bg-slate-600 px-2 py-1 text-[10px] font-medium text-slate-100 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Move up (Alt+↑)"
                >↑</button>
                <button
                  type="button"
                  @click="moveBlock(idx, 1)"
                  :disabled="idx===blocks.length-1"
                  class="rounded bg-slate-600 px-2 py-1 text-[10px] font-medium text-slate-100 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Move down (Alt+↓)"
                >↓</button>
                <button
                  type="button"
                  @click="duplicateBlock(idx)"
                  class="rounded bg-indigo-600 px-2 py-1 text-[10px] font-medium text-white hover:bg-indigo-500"
                  title="Duplicate (Alt+D)"
                >⧉</button>
                <button
                  type="button"
                  @click="removeBlock(idx)"
                  class="rounded bg-red-600 px-2 py-1 text-[10px] font-medium text-white hover:bg-red-500"
                  title="Delete (Del)"
                >✕</button>
              </div>
            </div>

            <!-- HOTLINK SETTINGS -->
            <div
              v-if="block.content.includeInToc"
              class="flex flex-col gap-3 border-t border-slate-700 bg-slate-800/60 px-4 py-3"
            >
              <div class="flex flex-wrap items-center gap-4">
                <label class="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                  Label
                  <input
                    class="w-56 rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                    v-model="block.content.anchorLabel"
                    @input="onHotlinkLabelChange(block)"
                    placeholder="e.g. Enter your personal information"
                  />
                </label>
                <div
                  v-if="block.content.anchorId"
                  class="flex items-center gap-1 rounded bg-slate-700/70 px-2 py-1 text-[10px] font-mono text-slate-300"
                >
                  <span class="opacity-70">ID:</span><code>{{ block.content.anchorId }}</code>
                </div>
                <button
                  type="button"
                  class="rounded bg-slate-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                  @click="regenerateAnchor(block)"
                  title="Regenerate based on label & ensure uniqueness"
                >
                  Regen ID
                </button>
              </div>
            </div>

            <!-- BLOCK BODY -->
            <div class="space-y-4 p-4">
              <!-- Paragraph -->
              <div v-if="block.type==='paragraph'" class="flex flex-col gap-3">
                <div class="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    class="rounded bg-indigo-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-indigo-500"
                    @click="insertLink(block)"
                  >
                    Insert Link
                  </button>
                  <span class="text-[10px] text-slate-400">Markdown: [text](https://...)</span>
                  <button
                    v-if="block.content.includeInToc"
                    type="button"
                    class="rounded bg-slate-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                    @click="suggestHotlinkFromParagraph(block)"
                  >
                    Suggest Label
                  </button>
                </div>
                <textarea
                  v-model="block.content.text"
                  :data-block-key="block.localKey"
                  rows="5"
                  class="w-full rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-xs leading-relaxed text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:bg-slate-900 focus:outline-none focus:ring focus:ring-slate-500/40 font-mono"
                  placeholder="Write paragraph text. Example: See our [help page](https://example.com/help)."
                ></textarea>
              </div>

              <!-- Media -->
              <div v-else-if="block.type==='media'" class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                  <label class="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                    Type:
                    <select
                      v-model="block.content.mediaType"
                      class="rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </label>
                  <div v-if="block.content.mediaType==='video'" class="flex-1">
                    <input
                      v-model="block.content.url"
                      placeholder="Video URL (YouTube or MP4)"
                      class="w-full rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                    />
                  </div>
                  <div v-else class="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      @change="onMediaFileChange($event, block)"
                      class="block w-full cursor-pointer rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-200 file:mr-2 file:rounded file:border-0 file:bg-slate-600 file:px-3 file:py-1 file:text-[10px] file:font-semibold file:uppercase file:tracking-wide file:text-slate-100 hover:file:bg-slate-500"
                    />
                  </div>
                </div>
                <input
                  v-model="block.content.caption"
                  placeholder="Caption (optional)"
                  class="w-full rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                />
                <div v-if="mediaPreview(block)" class="mt-2">
                  <img
                    v-if="block.content.mediaType==='image'"
                    :src="mediaPreview(block)"
                    class="max-h-48 rounded-lg border border-slate-600 object-cover shadow"
                  />
                </div>
              </div>

              <!-- Callout -->
              <div v-else-if="block.type==='callout'" class="flex flex-col gap-4">
                <label class="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                  Variant:
                  <select
                    v-model="block.content.variant"
                    class="rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                  >
                    <option value="general">General</option>
                    <option value="warning">Warning</option>
                    <option value="good">Good</option>
                    <option value="bad">Bad</option>
                  </select>
                </label>
                <textarea
                  v-model="block.content.text"
                  rows="3"
                  placeholder="Callout content..."
                  class="w-full rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-xs leading-relaxed text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:bg-slate-900 focus:outline-none focus:ring focus:ring-slate-500/40"
                ></textarea>
              </div>

              <!-- CTA -->
              <div v-else-if="block.type==='cta'" class="flex flex-col gap-4">
                <label class="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                  Style:
                  <select
                    v-model="block.content.style"
                    class="rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                  >
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                  </select>
                </label>
                <input
                  v-model="block.content.heading"
                  placeholder="Heading"
                  class="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                />
                <textarea
                  v-model="block.content.body"
                  rows="3"
                  placeholder="Body text"
                  class="w-full rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-xs leading-relaxed text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:bg-slate-900 focus:outline-none focus:ring focus:ring-slate-500/40"
                ></textarea>
                <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    v-model="block.content.buttonText"
                    placeholder="Button Text"
                    class="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                  />
                  <input
                    v-model="block.content.buttonUrl"
                    placeholder="Button URL (https://...)"
                    class="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                  />
                </div>
              </div>

              <!-- Bullets -->
              <div v-else-if="block.type==='bullets'" class="flex flex-col gap-4">
                <div class="flex items-center gap-3">
                  <span class="text-[10px] font-semibold uppercase tracking-wide text-slate-300">Bullet Items</span>
                  <button
                    type="button"
                    @click="addBullet(block)"
                    class="rounded bg-indigo-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-indigo-500"
                  >
                    + Item
                  </button>
                </div>
                <div
                  class="flex flex-col gap-2"
                  @dragover.prevent="onBulletsDragOver($event, block)"
                  @drop.prevent="onBulletsDrop($event, block)"
                >
                  <div
                    v-for="(item,i) in block.content.items"
                    :key="i"
                    class="flex items-start gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-2 py-2"
                    draggable="true"
                    :data-bullet-index="i"
                    @dragstart="onBulletDragStart($event, block, i)"
                    @dragenter.prevent="onBulletDragEnter($event, block, i)"
                    @dragend="onBulletDragEnd"
                    :class="bulletDrag.overIndex===i && bulletDrag.draggingIndex!==i && 'border-blue-500 ring-2 ring-blue-500/30'"
                  >
                    <span class="cursor-grab select-none text-slate-500 hover:text-slate-300">⋮</span>
                    <input
                      v-model="block.content.items[i]"
                      placeholder="Bullet point text"
                      class="flex-1 rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
                    />
                    <button
                      type="button"
                      class="rounded bg-slate-600 px-2 py-1 text-[10px] font-medium text-slate-100 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
                      @click="moveBullet(block,i,-1)"
                      :disabled="i===0"
                    >↑</button>
                    <button
                      type="button"
                      class="rounded bg-slate-600 px-2 py-1 text-[10px] font-medium text-slate-100 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
                      @click="moveBullet(block,i,1)"
                      :disabled="i===block.content.items.length-1"
                    >↓</button>
                    <button
                      type="button"
                      class="rounded bg-red-600 px-2 py-1 text-[10px] font-medium text-white hover:bg-red-500"
                      @click="removeBullet(block,i)"
                    >✕</button>
                  </div>
                </div>
              </div>

              <div v-else class="text-xs text-red-400">
                Unsupported block type: {{ block.type }}
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM ADD BLOCK BAR -->
        <div class="add-block-bar absolute inset-x-0 bottom-0 flex flex-col gap-3 border-t border-slate-700 bg-gradient-to-t from-slate-900/95 to-slate-900/60 px-4 py-4 backdrop-blur">
          <div class="flex flex-wrap items-center gap-3">
            <select
              v-model="newBlockType"
              class="min-w-[170px] rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium tracking-wide text-slate-100 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
            >
              <option disabled value="">Add new block…</option>
              <option value="paragraph">Paragraph</option>
              <option value="media-image">Image</option>
              <option value="media-video">Video</option>
              <option value="callout">Callout</option>
              <option value="cta">CTA</option>
              <option value="bullets">Bullets</option>
            </select>
            <button
              type="button"
              :disabled="!newBlockType"
              @click="addBlockFromSelector"
              class="rounded-md bg-indigo-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              + Add Block
            </button>
            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded bg-slate-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                @click="quickAdd('paragraph')"
                title="Quick paragraph"
              >P</button>
              <button
                type="button"
                class="rounded bg-slate-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                @click="quickAdd('media-image')"
                title="Quick image"
              >Img</button>
              <button
                type="button"
                class="rounded bg-slate-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                @click="quickAdd('callout')"
                title="Quick callout"
              >Call</button>
              <button
                type="button"
                class="rounded bg-slate-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                @click="quickAdd('bullets')"
                title="Quick bullets"
              >• • •</button>
            </div>
          </div>
        </div>
      </div>

      <p
        v-if="error"
        class="absolute top-0 mx-auto w-fit rounded-xl border border-red-600 bg-red-600/20 p-4 text-center text-sm text-red-300 shadow"
      >
        {{ error }}
      </p>

      <!-- RELATED ARTICLES -->
      <div class="flex flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-900/40 p-5 backdrop-blur">
        <h3 class="m-0 text-base font-semibold text-slate-100">Related Articles</h3>
        <p class="m-0 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Select up to 4 published articles to show as related content.
        </p>
        <div class="flex flex-col gap-3">
          <div
            v-for="(related, idx) in relatedBlogs"
            :key="related.localKey"
            class="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-800/60 p-3 shadow-sm"
          >
            <span class="select-none cursor-grab text-sm opacity-60">::</span>
            <div class="flex-1">
              <select
                v-model="related.blogId"
                @change="onRelatedBlogChange(idx)"
                class="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-500/40"
              >
                <option value="">Select an article...</option>
                <option
                  v-for="blogOpt in availableBlogs"
                  :key="blogOpt.id"
                  :value="blogOpt.id"
                  :disabled="isRelatedBlogSelected(blogOpt.id, idx)"
                >
                  {{ blogOpt.title }}
                </option>
              </select>
            </div>
            <button
              type="button"
              class="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-red-500"
              @click="removeRelatedBlog(idx)"
            >
              ✕
            </button>
          </div>
          <button
            v-if="relatedBlogs.length < 4"
            type="button"
            class="self-start rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-blue-500"
            @click="addRelatedBlog"
          >
            + Add Related Article
          </button>
        </div>
      </div>
    </form>

    <!-- SCHEDULE MODAL -->
    <div
      v-if="showScheduleModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur"
      @click.self="showScheduleModal = false"
    >
      <div class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
        <h3 class="mb-4 text-lg font-semibold text-slate-100">Schedule Publication</h3>
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-300">Publish Date & Time</label>
            <input
              v-model="scheduledDateTime"
              type="datetime-local"
              :min="minDateTime"
              class="w-full rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
            />
          </div>
          <div class="mt-2 flex justify-end gap-3">
            <button
              type="button"
              @click="showScheduleModal = false"
              class="rounded-md bg-slate-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirmSchedule"
              :disabled="!scheduledDateTime"
              class="rounded-md bg-blue-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CONFIRM MODAL -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur"
      @click.self="showConfirmModal = false"
    >
      <div class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
        <h3 class="mb-4 text-lg font-semibold text-slate-100">Confirm Schedule</h3>
        <p class="mb-6 text-slate-300">
          Schedule for <strong class="text-slate-100">{{ formatScheduledDate }}</strong>?
        </p>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="showConfirmModal = false"
            class="rounded-md bg-slate-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="publishScheduled"
            :disabled="saving"
            class="rounded-md bg-emerald-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ saving ? 'Scheduling...' : 'Confirm' }}
          </button>
        </div>
      </div>
    </div>

    <!-- PREVIEW MODAL -->
    <BlogPreviewModal
      v-if="showPreview"
      :blog="previewBlog"
      :loading="generatingPreview"
      @close="closePreview"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogs } from '../../../composables/useBlogs'
import BlogPreviewModal from '../../../components/BlogPreviewModal.vue'

const route = useRoute()
const router = useRouter()
const blogId = route.params.id
const isEdit = computed(() => !!blogId)
const {
  loadBlog,
  currentBlog,
  save,
  error,
  listPublishedBlogs,
  listBlockTemplates,
  blockTemplates
} = useBlogs()

/* FORM STATE */
const form = reactive({
  id: null,
  title: '',
  body: '',
  coverFile: null,
  cover_url: null,
  status: 'draft',
  published_at: null,
  to_be_published_date: null,
  block_template_id: null
})

/* TEMPLATE STATE */
const templates = blockTemplates
const selectedTemplateId = ref('')
const applyingTemplate = ref(false)
const appliedTemplateName = ref('')
const templateApplyMessage = ref('')

/* COLLECTIONS */
const assets = ref([])
const relatedBlogs = ref([])
const availableBlogs = ref([])
const blocks = ref([])

/* UI STATE */
const newBlockType = ref('')
const saving = ref(false)
const coverPreview = ref(null)
const showScheduleModal = ref(false)
const showConfirmModal = ref(false)
const scheduledDateTime = ref('')

/* PREVIEW STATE */
const showPreview = ref(false)
const generatingPreview = ref(false)
const previewObjectUrls = ref([])

/* DRAG STATE */
const dragState = reactive({ draggingIndex: null, overIndex: null })
const assetDrag = reactive({ draggingIndex: null, overIndex: null })
const relationDrag = reactive({ draggingIndex: null, overIndex: null })
const bulletDrag = reactive({ blockLocalKey: null, draggingIndex: null, overIndex: null })

const minDateTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 16)
})
const formatScheduledDate = computed(() => scheduledDateTime.value
  ? new Date(scheduledDateTime.value).toLocaleString()
  : '')

const hasVideo = computed(() => assets.value.some(a => a.type === 'video'))

async function loadAvailableBlogs() {
  try {
    const blogs = await listPublishedBlogs({ limit: 100 })
    availableBlogs.value = blogs.filter(blog => blog.id !== form.id)
  } catch (e) {
    console.error('Failed to load available blogs:', e)
  }
}

async function loadTemplates() {
  try {
    await listBlockTemplates()
  } catch (e) {
    console.error('Failed to load templates', e)
  }
}

onMounted(async () => {
  await Promise.all([loadAvailableBlogs(), loadTemplates()])
  if (isEdit.value) {
    await loadBlog(blogId)
    if (currentBlog.value) {
      Object.assign(form, {
        id: currentBlog.value.id,
        title: currentBlog.value.title,
        template: currentBlog.value.template,
        body: currentBlog.value.body,
        cover_url: currentBlog.value.cover_url,
        status: currentBlog.value.status,
        published_at: currentBlog.value.published_at,
        to_be_published_date: currentBlog.value.to_be_published_date,
        block_template_id: currentBlog.value.block_template_id || null
      })
      if (form.block_template_id) {
        const t = templates.value.find(t => t.id === form.block_template_id)
        if (t) {
          appliedTemplateName.value = t.name
        }
      }
      coverPreview.value = form.cover_url
      if (Array.isArray(currentBlog.value.blog_blocks) && currentBlog.value.blog_blocks.length) {
        blocks.value = currentBlog.value.blog_blocks
          .sort((a,b)=> a.position - b.position)
          .map(b => ({
            id: b.id,
            type: b.type,
            position: b.position,
            content: {
              ...b.content,
              includeInToc: !!b.content?.includeInToc,
              anchorLabel: b.content?.anchorLabel || '',
              anchorId: b.content?.anchorId || ''
            },
            localKey: b.id
          }))
      } else if (form.body) {
        blocks.value = [{
          id: null,
          type: 'paragraph',
          position: 0,
          content: { text: form.body, includeInToc: false, anchorLabel: '', anchorId: '' },
          localKey: Math.random().toString(36).slice(2)
        }]
      }
      if (Array.isArray(currentBlog.value.blog_assets)) {
        assets.value = currentBlog.value.blog_assets
          .sort((a,b)=> a.position - b.position)
          .map(a => ({
            id: a.id,
            type: a.type,
            url: a.url,
            caption: a.caption,
            position: a.position,
            localKey: a.id
          }))
      }
      if (Array.isArray(currentBlog.value.blog_relations)) {
        relatedBlogs.value = currentBlog.value.blog_relations
          .sort((a,b)=> a.position - b.position)
          .map(r => ({
            id: r.id,
            blogId: r.related_blog_id,
            position: r.position,
            localKey: r.id || Math.random().toString(36).slice(2)
          }))
      }
    }
  }
})

/* APPLY TEMPLATE */
async function applyTemplate() {
  if (!selectedTemplateId.value) return
  const template = templates.value.find(t => t.id === selectedTemplateId.value)
  if (!template) return
  if (blocks.value.length) {
    const proceed = window.confirm('Applying this template will replace current blocks. Continue?')
    if (!proceed) return
  }
  applyingTemplate.value = true
  try {
    const incoming = Array.isArray(template.blocks) ? template.blocks : []
    blocks.value = incoming.map((b, i) => {
      const baseContent = defaultContentForType(b.type, b.content)
      return {
        id: null,
        type: b.type,
        position: i,
        content: {
          ...baseContent,
          includeInToc: !!baseContent.includeInToc,
          anchorLabel: baseContent.anchorLabel || '',
          anchorId: ''
        },
        localKey: Math.random().toString(36).slice(2)
      }
    })
    appliedTemplateName.value = template.name
    form.block_template_id = template.id
    templateApplyMessage.value = `Template "${template.name}" applied.`
    setTimeout(()=> templateApplyMessage.value = '', 4000)
  } finally {
    applyingTemplate.value = false
  }
}
function defaultContentForType(type, existing = {}) {
  switch(type){
    case 'paragraph': return { text: existing.text || '', includeInToc:false, anchorLabel:'', anchorId:'' }
    case 'media': return { mediaType: existing.mediaType || 'image', url:'', caption:'', file:null, includeInToc:false, anchorLabel:'', anchorId:'' }
    case 'callout': return { variant: existing.variant || 'general', text: existing.text || '', includeInToc:false, anchorLabel:'', anchorId:'' }
    case 'cta': return { style: existing.style || 'template1', heading:'', body:'', buttonText:'', buttonUrl:'', includeInToc:false, anchorLabel:'', anchorId:'' }
    case 'bullets': return { items: [], includeInToc:false, anchorLabel:'', anchorId:'' }
    default: return { }
  }
}

/* PREVIEW BUILD */
const previewBlog = computed(() => {
  // Build related previews
  const related = relatedBlogs.value
    .map(r => {
      const found = availableBlogs.value.find(b => b.id === r.blogId)
      if (!found) return null
      return {
        id: r.id || null,
        position: r.position,
        related_blog: {
          id: found.id,
            title: found.title,
          slug: found.slug,
          cover_url: found.cover_url,
          published_at: found.published_at,
          status: 'published'
        }
      }
    })
    .filter(Boolean)

  // Build blocks with preview image URLs
  const blockCopies = blocks.value.map(b => {
    const content = JSON.parse(JSON.stringify(b.content || {}))
    if (b.type === 'media' && content.mediaType === 'image' && content.file instanceof File) {
      // If url not yet uploaded, we assign a temporary preview URL (already generated earlier)
      if (!content.url && content._previewUrl) {
        content.url = content._previewUrl
      }
    }
    return {
      id: b.id,
      type: b.type,
      position: b.position,
      content
    }
  })

  // Legacy assets preview (if needed)
  const assetCopies = assets.value.map(a => {
    if (a.type === 'image' && a.file instanceof File && a._previewUrl) {
      return { ...a, url: a._previewUrl }
    }
    return { ...a }
  })

  return {
    id: form.id,
    title: form.title || '(Untitled Draft)',
    slug: '(preview)',
    template: form.template || 'basic',
    cover_url: coverPreview.value || form.cover_url || null,
    status: 'published', // Force preview look
    selection: false,
    published_at: form.published_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    body: form.body,
    blog_blocks: blockCopies,
    blog_assets: assetCopies,
    related_blogs: related
  }
})

function openPreview() {
  generatingPreview.value = true
  // Revoke old
  previewObjectUrls.value.forEach(u => URL.revokeObjectURL(u))
  previewObjectUrls.value = []

  // Create object URLs for unsaved images in blocks & assets
  blocks.value.forEach(b => {
    if (b.type === 'media' && b.content.mediaType === 'image' && b.content.file instanceof File) {
      if (!b.content._previewUrl) {
        const u = URL.createObjectURL(b.content.file)
        previewObjectUrls.value.push(u)
        b.content._previewUrl = u
      }
    }
  })
  assets.value.forEach(a => {
    if (a.type === 'image' && a.file instanceof File && !a._previewUrl) {
      const u = URL.createObjectURL(a.file)
      previewObjectUrls.value.push(u)
      a._previewUrl = u
    }
  })

  // Recompute body from paragraphs (mirror submit logic) so preview body is up-to-date
  const paragraphTexts = blocks.value
    .filter(b => b.type === 'paragraph')
    .map(b => (b.content.text || '').trim())
    .filter(Boolean)
  form.body = paragraphTexts.join('\n\n')

  // Slight delay to allow computed to settle
  requestAnimationFrame(() => {
    generatingPreview.value = false
    showPreview.value = true
  })
}

function closePreview() {
  showPreview.value = false
  // do not revoke immediately; keep for potential reopen; but free memory:
  previewObjectUrls.value.forEach(u => URL.revokeObjectURL(u))
  previewObjectUrls.value = []
  // Remove _previewUrl markers
  blocks.value.forEach(b => { if (b.content && b.content._previewUrl) delete b.content._previewUrl })
  assets.value.forEach(a => { if (a._previewUrl) delete a._previewUrl })
}

/* QUICK ADD */
function quickAdd(kind) {
  switch(kind) {
    case 'paragraph': addParagraphBlock(); break
    case 'media-image': addMediaBlock('image'); break
    case 'media-video': addMediaBlock('video'); break
    case 'callout': addCalloutBlock(); break
    case 'cta': addCtaBlock(); break
    case 'bullets': addBulletsBlock(); break
  }
  scrollAddBarIntoView()
}
function scrollAddBarIntoView() {
  requestAnimationFrame(()=>{
    const el = document.querySelector('.add-block-bar')
    if (el) el.scrollIntoView({ behavior:'smooth', block:'nearest' })
  })
}

/* HOTLINK (TOC) */
function onToggleHotlink(block) {
  if (block.content.includeInToc) {
    if (!block.content.anchorLabel) {
      block.content.anchorLabel = defaultSuggestedLabel(block)
    }
    if (!block.content.anchorId) {
      block.content.anchorId = generateUniqueAnchorId(block.content.anchorLabel)
    } else {
      block.content.anchorId = ensureAnchorUniqueness(block.content.anchorId, block)
    }
  }
}
function onHotlinkLabelChange(block) {
  block.content.anchorId = generateUniqueAnchorId(block.content.anchorLabel, block.content.anchorId)
}
function regenerateAnchor(block) {
  block.content.anchorId = generateUniqueAnchorId(block.content.anchorLabel || defaultSuggestedLabel(block))
}
function defaultSuggestedLabel(block) {
  if (block.type === 'paragraph') {
    const text = (block.content.text || '').trim()
    return text ? truncateWords(text, 8) : 'Section'
  }
  if (block.type === 'callout') {
    const tx = (block.content.text || '').trim()
    return tx ? truncateWords(tx, 6) : 'Callout'
  }
  if (block.type === 'bullets') {
    const first = block.content.items?.[0] || 'List'
    return truncateWords(first, 6)
  }
  if (block.type === 'media') {
    return block.content.mediaType === 'video' ? 'Video' : 'Image'
  }
  if (block.type === 'cta') return block.content.heading || 'CTA'
  return 'Section'
}
function truncateWords(str, limit) {
  return str.split(/\s+/).slice(0, limit).join(' ').replace(/[\s,.;:!?]+$/,'')
}
function slugify(str) {
  return (str || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/['"]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'')
    .slice(0, 60) || 'section'
}
function generateUniqueAnchorId(label, currentId = '') {
  const base = slugify(label)
  let candidate = base
  let i = 2
  while (anchorIdTaken(candidate, currentId)) {
    candidate = `${base}-${i++}`
    if (i > 200) break
  }
  return candidate
}
function anchorIdTaken(id, currentId) {
  return blocks.value.some(b =>
    b.content?.includeInToc &&
    b.content?.anchorId === id &&
    b.content.anchorId !== currentId
  )
}
function ensureAnchorUniqueness(id, block) {
  if (!id) return generateUniqueAnchorId(block.content.anchorLabel)
  if (!anchorIdTaken(id, id)) return id
  return generateUniqueAnchorId(block.content.anchorLabel, id)
}
function suggestHotlinkFromParagraph(block) {
  if (block.type !== 'paragraph') return
  const suggestion = defaultSuggestedLabel(block)
  if (suggestion) {
    block.content.anchorLabel = suggestion
    block.content.anchorId = generateUniqueAnchorId(suggestion, block.content.anchorId)
  }
}

/* INSERT LINK */
function insertLink(block) {
  nextTick(()=>{
    const el = document.querySelector(`textarea[data-block-key="${block.localKey}"]`)
    const original = block.content.text || ''
    let selectionStart = 0
    let selectionEnd = 0
    if (el) {
      selectionStart = el.selectionStart
      selectionEnd = el.selectionEnd
    }
    const selected = original.slice(selectionStart, selectionEnd)
    const url = window.prompt('Enter URL (https://...)')
    if (!url) return
    const safeUrl = normalizeUrl(url)
    const anchorText = selected || window.prompt('Anchor text', 'Click here') || 'link'
    const md = `[${anchorText}](${safeUrl})`
    if (!el) {
      block.content.text = (original ? original + ' ' : '') + md
    } else {
      block.content.text =
        original.slice(0, selectionStart) + md + original.slice(selectionEnd)
      nextTick(()=>{
        const pos = selectionStart + md.length
        el.focus()
        el.setSelectionRange(pos,pos)
      })
    }
  })
}
function normalizeUrl(url){
  if(!/^https?:\/\//i.test(url)) return 'https://' + url
  return url
}

/* BLOCK HELPERS */
function addBlockFromSelector() {
  if (!newBlockType.value) return
  quickAdd(newBlockType.value)
  newBlockType.value = ''
}
function addParagraphBlock(){ blocks.value.push(makeBlock('paragraph',{ text:'', includeInToc:false, anchorLabel:'', anchorId:'' })); reorderBlockPositions() }
function addMediaBlock(mediaType){ blocks.value.push(makeBlock('media',{ mediaType, url:'', caption:'', file:null, includeInToc:false, anchorLabel:'', anchorId:'' })); reorderBlockPositions() }
function addCalloutBlock(){ blocks.value.push(makeBlock('callout',{ variant:'general', text:'', includeInToc:false, anchorLabel:'', anchorId:'' })); reorderBlockPositions() }
function addCtaBlock(){ blocks.value.push(makeBlock('cta',{ style:'template1', heading:'', body:'', buttonText:'', buttonUrl:'', includeInToc:false, anchorLabel:'', anchorId:'' })); reorderBlockPositions() }
function addBulletsBlock(){ blocks.value.push(makeBlock('bullets',{ items:[], includeInToc:false, anchorLabel:'', anchorId:'' })); reorderBlockPositions() }
function makeBlock(type, content){
  return { id:null, type, content:JSON.parse(JSON.stringify(content)), position:blocks.value.length, localKey:Math.random().toString(36).slice(2) }
}
function removeBlock(i){ blocks.value.splice(i,1); reorderBlockPositions() }
function moveBlock(i,delta){
  const ni=i+delta
  if(ni<0 || ni>=blocks.value.length) return
  const [it]=blocks.value.splice(i,1)
  blocks.value.splice(ni,0,it)
  reorderBlockPositions()
  scrollAddBarIntoView()
}
function duplicateBlock(i){
  const cloneData = JSON.parse(JSON.stringify(blocks.value[i].content))
  if (cloneData.includeInToc) {
    cloneData.anchorId = ''
  }
  const clone = makeBlock(blocks.value[i].type, cloneData)
  blocks.value.splice(i+1,0,clone)
  if (clone.content.includeInToc) {
    clone.content.anchorId = generateUniqueAnchorId(clone.content.anchorLabel)
  }
  reorderBlockPositions()
  scrollAddBarIntoView()
}
function reorderBlockPositions(){ blocks.value.forEach((b,i)=> b.position=i) }
function labelFor(block){
  if(block.type==='media') return `Media (${block.content.mediaType})`
  if(block.type==='callout') return `Callout (${block.content.variant})`
  if(block.type==='cta') return `CTA (${block.content.style})`
  return block.type.charAt(0).toUpperCase()+block.type.slice(1)
}

/* BULLETS */
function addBullet(block){ block.content.items.push('') }
function removeBullet(block,i){ block.content.items.splice(i,1) }
function moveBullet(block,i,delta){
  const ni=i+delta
  if(ni<0 || ni>=block.content.items.length) return
  const [it]=block.content.items.splice(i,1)
  block.content.items.splice(ni,0,it)
}
function onBulletDragStart(e, block, index){
  bulletDrag.blockLocalKey = block.localKey
  bulletDrag.draggingIndex = index
  e.dataTransfer.effectAllowed='move'
}
function onBulletDragEnter(e, block, index){
  if(bulletDrag.blockLocalKey!==block.localKey) return
  bulletDrag.overIndex=index
}
function onBulletsDragOver(e){ e.preventDefault() }
function onBulletsDrop(e, block){
  if(bulletDrag.blockLocalKey!==block.localKey) return
  const { draggingIndex, overIndex } = bulletDrag
  if(draggingIndex===null || overIndex===null || draggingIndex===overIndex) { resetBulletDrag(); return }
  const arr=block.content.items
  const [it]=arr.splice(draggingIndex,1)
  arr.splice(overIndex,0,it)
  resetBulletDrag()
}
function onBulletDragEnd(){ resetBulletDrag() }
function resetBulletDrag(){
  bulletDrag.blockLocalKey=null
  bulletDrag.draggingIndex=null
  bulletDrag.overIndex=null
}

/* MEDIA BLOCK FILE */
function onMediaFileChange(e, block){
  const file=e.target.files?.[0]
  if(file){
    block.content.file=file
    block.content.url=''
  }
}
function mediaPreview(block){
  if(block.type!=='media') return null
  if(block.content.mediaType!=='image') return null
  if(block.content.file) return URL.createObjectURL(block.content.file)
  return block.content.url || null
}

/* LEGACY ASSETS */
function addAsset(type){
  assets.value.push({
    id:null,type,
    file:null,
    url:type==='video'?'':'',
    caption:'',
    position:assets.value.length,
    localKey:Math.random().toString(36).slice(2)
  })
}
function removeAsset(i){ assets.value.splice(i,1); reorderAssetPositions() }
function reorderAssetPositions(){ assets.value.forEach((a,i)=> a.position=i) }
function onAssetFile(e, asset){
  const file=e.target.files[0]
  if(file){ asset.file=file; asset.url=null }
}
function assetPreview(asset){
  if(asset.type!=='image') return null
  if(asset.file) return URL.createObjectURL(asset.file)
  return asset.url
}

/* RELATED */
function addRelatedBlog(){
  if(relatedBlogs.value.length<4){
    relatedBlogs.value.push({
      blogId:'',
      position:relatedBlogs.value.length,
      localKey:Math.random().toString(36).slice(2)
    })
  }
}
function removeRelatedBlog(i){ relatedBlogs.value.splice(i,1); reorderRelatedPositions() }
function reorderRelatedPositions(){ relatedBlogs.value.forEach((r,i)=> r.position=i) }
function onRelatedBlogChange(){}
function isRelatedBlogSelected(id,current){
  return relatedBlogs.value.some((r,i)=> r.blogId===id && i!==current)
}

/* COVER */
function onCoverChange(e){
  const file=e.target.files[0]
  if(file){
    form.coverFile=file
    coverPreview.value=URL.createObjectURL(file)
  }
}
function removeCover(){
  form.coverFile=null
  form.cover_url=null
  coverPreview.value=null
}

/* SCHEDULING */
function confirmSchedule(){
  if(!scheduledDateTime.value) return
  showScheduleModal.value=false
  showConfirmModal.value=true
}
async function publishScheduled(){
  if(!scheduledDateTime.value) return
  const scheduledDate=new Date(scheduledDateTime.value).toISOString()
  await submit(false, scheduledDate)
  showConfirmModal.value=false
  scheduledDateTime.value=''
}
async function saveDraft(){ await submit(false) }
async function publish(){ await submit(true) }

/* SUBMIT */
async function submit(publishNow, toBePublishedDate=null){
  saving.value=true
  try {
    const paragraphTexts = blocks.value
      .filter(b=>b.type==='paragraph')
      .map(b=>(b.content.text||'').trim())
      .filter(Boolean)
    form.body = paragraphTexts.join('\n\n')
    const payload = {
      id: form.id,
      title: form.title,
      template: form.template,
      body: form.body,
      coverFile: form.coverFile,
      cover_url: form.cover_url,
      status: form.status,
      published_at: form.published_at,
      to_be_published_date: toBePublishedDate,
      block_template_id: form.block_template_id,
      assets: assets.value.map(a=>({
        id:a.id, type:a.type, file:a.file, url:a.url, caption:a.caption, position:a.position
      })),
      relatedBlogs: relatedBlogs.value
        .filter(r=>r.blogId)
        .map(r=>({ id:r.id, related_blog_id:r.blogId, position:r.position })),
      blocks: blocks.value.map(b=>({
        id:b.id,
        type:b.type,
        position:b.position,
        content:{
          ...b.content
        }
      }))
    }
    const saved = await save(payload, { publishNow, toBePublishedDate })
    if(!form.id){
      form.id=saved.id
      router.replace({ name:'DashboardBlogEdit', params:{ id:saved.id } })
    } else {
      form.status = saved.status
      form.published_at = saved.published_at
      form.to_be_published_date = saved.to_be_published_date
      form.block_template_id = saved.block_template_id || form.block_template_id
    }
  } catch(e) {
    console.error(e)
  } finally {
    saving.value=false
  }
}

/* DRAG HANDLERS - BLOCKS */
function onBlockDragStart(e, index){
  dragState.draggingIndex=index
  dragState.overIndex=index
  e.dataTransfer.effectAllowed='move'
  try { e.dataTransfer.setData('text/plain', String(index)) } catch(_) {}
}
function onBlockDragEnter(e, index){
  dragState.overIndex=index
}
function onBlocksDragOver(e){ e.preventDefault() }
function onBlocksDrop(){
  if(dragState.draggingIndex===null || dragState.overIndex===null) { resetBlockDrag(); return }
  if(dragState.draggingIndex !== dragState.overIndex){
    const arr=blocks.value
    const [item]=arr.splice(dragState.draggingIndex,1)
    arr.splice(dragState.overIndex,0,item)
    reorderBlockPositions()
  }
  resetBlockDrag()
  scrollAddBarIntoView()
}
function onBlockDragEnd(){ resetBlockDrag() }
function resetBlockDrag(){
  dragState.draggingIndex=null
  dragState.overIndex=null
}

/* DRAG HANDLERS - ASSETS */
function onAssetDragStart(e,index){
  assetDrag.draggingIndex=index
  assetDrag.overIndex=index
  e.dataTransfer.effectAllowed='move'
}
function onAssetDragEnter(e,index){ assetDrag.overIndex=index }
function onAssetsDragOver(e){ e.preventDefault() }
function onAssetsDrop(){
  if(assetDrag.draggingIndex===null || assetDrag.overIndex===null){ resetAssetDrag(); return }
  if(assetDrag.draggingIndex!==assetDrag.overIndex){
    const arr=assets.value
    const [it]=arr.splice(assetDrag.draggingIndex,1)
    arr.splice(assetDrag.overIndex,0,it)
    reorderAssetPositions()
  }
  resetAssetDrag()
}
function onAssetDragEnd(){ resetAssetDrag() }
function resetAssetDrag(){ assetDrag.draggingIndex=null; assetDrag.overIndex=null }

/* DRAG HANDLERS - RELATED */
function onRelatedDragStart(e,index){
  relationDrag.draggingIndex=index
  relationDrag.overIndex=index
  e.dataTransfer.effectAllowed='move'
}
function onRelatedDragEnter(e,index){ relationDrag.overIndex=index }
function onRelatedDragOver(e){ e.preventDefault() }
function onRelatedDrop(){
  if(relationDrag.draggingIndex===null || relationDrag.overIndex===null){ resetRelationDrag(); return }
  if(relationDrag.draggingIndex!==relationDrag.overIndex){
    const arr=relatedBlogs.value
    const [it]=arr.splice(relationDrag.draggingIndex,1)
    arr.splice(relationDrag.overIndex,0,it)
    reorderRelatedPositions()
  }
  resetRelationDrag()
}
function onRelatedDragEnd(){ resetRelationDrag() }
function resetRelationDrag(){ relationDrag.draggingIndex=null; relationDrag.overIndex=null }
</script>