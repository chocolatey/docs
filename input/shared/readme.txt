Statiq has the concept of Markdown fragments, meaning that you can put some markdown content into one file, and then
include it within another, perhaps larger, markdown file.  This makes it very simple to share sections of documents,
rather than duplicating the content in mutiple places.

To use a markdown fragment, simply create a file in this shared folder (use the .txt extension to stop Statiq attempting
to process this file directly as a markdown file), and then reference it in another markdown file using something
similar to the following:

```
<?! Include "../../../shared/configuration-managers.txt" /?>
```

Where you use a relative path to the shared file.