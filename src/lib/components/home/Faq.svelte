<script lang="ts">
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
</script>

<Accordion class="my-8 ">
    <AccordionItem open class="shadow-lg rounded-lg">
      <svelte:fragment slot="summary">How do I get started on CyberBlogs?</svelte:fragment>
      <svelte:fragment slot="content">
        Sign up with your email address or Google account. After registration, you can customize your profile and start interacting.
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem class="shadow-lg rounded-lg">
      <svelte:fragment slot="summary">How can I write and publish Blogs on CyberBlogs?</svelte:fragment>
      <svelte:fragment slot="content">
        After logging in, click on the "Write" button on the top right corner. You can then start writing your article in the editor, format it using the provided options, add images. Once you're satisfied, click "Publish" to make your article live.
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem class="shadow-lg rounded-lg">
      <svelte:fragment slot="summary"> How can I format my articles on CyberBlogs?</svelte:fragment>
      <svelte:fragment slot="content">
        The editor provides options to format text, such as making text bold, italic, or underlined, creating headings, adding bullet or numbered lists, and inserting hyperlinks. You can also add images by clicking on the "+" button within the editor and selecting the image option.
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem class="shadow-lg rounded-lg">
      <svelte:fragment slot="summary">How can I discover and explore articles and topics of interest on CyberBlogs?</svelte:fragment>
      <svelte:fragment slot="content">
        Explore the CyberBlogs homepage, where you'll find a curated selection of popular and trending articles across various topics.
        Use the search bar to look for specific topics, writers, or publications.
      </svelte:fragment>
    </AccordionItem>
  </Accordion>