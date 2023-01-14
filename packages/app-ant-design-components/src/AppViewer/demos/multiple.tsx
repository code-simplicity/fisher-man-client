import { AppViewer } from 'app-ant-design-components';
import React, { useState } from 'react';

export default () => {
  const [viewerState, setViewer] = useState({ visible: false, activeIndex: 0 });
  const handleViewClose = (visible: boolean) => {
    setViewer({ ...viewerState, visible: visible });
  };

  const handleViewerOpen = (visible: boolean, activeIndex: number) => {
    console.log('activeIndex ==>', activeIndex);
    setViewer({ ...viewerState, visible: visible, activeIndex: activeIndex });
  };

  return (
    <AppViewer
      images={[
        {
          src: 'https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/fisher-uploads/2022-12-09/BA999XMDKSULDXQTFA80XW.png',
          alt: '图片1',
        },
        {
          src: 'https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/fisher-uploads/2022-12-18/N6S6N9XZXDQKFSG46L58UK.png',
          alt: '图片2',
        },
        {
          src: 'https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/code-images%5C202207231457711.png',
          alt: '图片3',
        },
      ]}
      visible={viewerState.visible}
      activeIndex={viewerState.activeIndex}
      onViewerOpen={handleViewerOpen}
      onViewerClose={handleViewClose}
    />
  );
};
