import { IApp } from "@/OS/constants";
import { observable } from "@legendapp/state";
import { IconTemplate } from "@tabler/icons-react";
import { IWidgets } from '@/OS/constants';
import { opaqueObject } from '@legendapp/state';
import { observer, useIsMounted } from "@legendapp/state/react";
import { Box, Button, Group, Skeleton } from "@mantine/core";
import { getAppData } from "@/OS/utils";
import { AppIcon } from "@/OS/components/Bar";
import { configurePageHash } from "@legendapp/state/helpers/pageHash";
import { useTraceListeners } from "@legendapp/state/trace";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { nanoid } from "nanoid";

const AppTemplate = observer(() => {
    configurePageHash({ setter: 'pushState' });
  
    const isMounted = useIsMounted();
    const onClick = () => {
      setTimeout(() => {
        if (isMounted.get()) {
          console.log('Debounced click');
        }
      }, 100);
    };
  
    useTraceListeners();
  
    return (
      <>
        <Box p={10}>
          <Button onClick={() => pageHashParams.userid.set(nanoid(6))} />
          <button onClick={onClick}>Click me</button>
          Yo!
        </Box>
      </>
    );
  });
  
const TemplateMenu = observer(() => {
    return <>This is a widget menu of Template!</>;
  });

const TemplateIcon = observer(() => {
    const { app, isDefaultApp } = getAppData('template');
    return (
      <Group
        p={0}
        m={0}
        h={34}
        style={{
          transition: 'width 0.3s ease',
          borderRadius: 6,
        }}
        w={isDefaultApp ? 80 : 35}
        justify="center"
      >
        <AppIcon app={app} />
      </Group>
    );
  });

const WidgetTemplate = observer(() => {
    return <Skeleton h={200} w={300} />;
  });

const widgets: IWidgets = {
  app: opaqueObject(() => <AppTemplate />),
  default: opaqueObject(() => <WidgetTemplate />),
  icon: opaqueObject(() => <TemplateIcon />),
  menu: opaqueObject(() => <TemplateMenu />),
};

const template$ = observable({});

const Template: IApp = {
    id: 'template',
    name: 'Template',
    icon: IconTemplate,
    version: '1.0.0',
    widgets: widgets,
    api: () => template$,
  };
  
  export default Template;
  
