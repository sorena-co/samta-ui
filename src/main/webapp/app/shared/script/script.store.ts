interface Scripts {
    name: string;
    src: string;
}
/*
*     <script src="/content/js/stimulsoft/stimulsoft.reports.js"></script>
    <script src="/content/js/stimulsoft/stimulsoft.designer.js"></script>
    <script src="/content/js/stimulsoft/stimulsoft.viewer.js"></script>
*/
export const ScriptStore: Scripts[] = [
    {name: 'stimulsoft.reports', src: '/content/js/stimulsoft.reports.js'},
    {name: 'stimulsoft.viewer', src: '/content/js/stimulsoft.viewer.js'},
    {name: 'stimulsoft.designer', src: '/content/js/stimulsoft.designer.js'}

];
