"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("@legendapp/state");
var icons_react_1 = require("@tabler/icons-react");
var react_1 = require("@legendapp/state/react");
var core_1 = require("@mantine/core");
var utils_1 = require("@/OS/utils");
var Bar_1 = require("@/OS/components/Bar");
var pageHash_1 = require("@legendapp/state/helpers/pageHash");
var trace_1 = require("@legendapp/state/trace");
var pageHashParams_1 = require("@legendapp/state/helpers/pageHashParams");
var nanoid_1 = require("nanoid");
var AppTemplate = (0, react_1.observer)(function () {
    (0, pageHash_1.configurePageHash)({ setter: 'pushState' });
    var isMounted = (0, react_1.useIsMounted)();
    var onClick = function () {
        setTimeout(function () {
            if (isMounted.get()) {
                console.log('Debounced click');
            }
        }, 100);
    };
    (0, trace_1.useTraceListeners)();
    return (<>
      <core_1.Box p={10}>
        <core_1.Button onClick={function () { return pageHashParams_1.pageHashParams.userid.set((0, nanoid_1.nanoid)(6)); }}/>
        <button onClick={onClick}>Click me</button>
        Yo!
      </core_1.Box>
    </>);
});
var TemplateMenu = (0, react_1.observer)(function () {
    return <>This is a widget menu of Template!</>;
});
var TemplateIcon = (0, react_1.observer)(function () {
    var _a = (0, utils_1.getAppData)('template'), app = _a.app, isDefaultApp = _a.isDefaultApp;
    return (<core_1.Group p={0} m={0} h={34} style={{
            transition: 'width 0.3s ease',
            borderRadius: 6,
        }} w={isDefaultApp ? 80 : 35} justify="center">
      <Bar_1.AppIcon app={app}/>
    </core_1.Group>);
});
var WidgetTemplate = (0, react_1.observer)(function () {
    return <core_1.Skeleton h={200} w={300}/>;
});
var widgets = {
    app: <AppTemplate />,
    default: <WidgetTemplate />,
    icon: <TemplateIcon />,
    menu: <TemplateMenu />,
};
var template$ = (0, state_1.observable)({});
var Template = {
    id: 'template', //univoque id
    name: 'Template', //name of the app
    icon: icons_react_1.IconTemplate, //icon can be tabler or url
    version: '1.0.0', //version (will be helpful for builder)
    widgets: widgets, //array of widgets using Widget[] from OS
    api: function () { return template$; }, //the previuosly declared observable
};
exports.default = Template;
