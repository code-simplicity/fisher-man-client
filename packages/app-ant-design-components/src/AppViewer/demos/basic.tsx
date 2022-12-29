import { AppViewer } from 'app-ant-design-components';
import React, { useState } from 'react';

export default () => {
  const [viewerState, setViewer] = useState({ visible: false, activeIndex: 0 });
  const handleViewClose = ({ visible }: { visible: boolean }) => {
    setViewer({ ...viewerState, visible: visible });
  };

  const handleViewerOpen = ({
    visible,
    activeIndex,
  }: {
    visible: boolean;
    activeIndex: number;
  }) => {
    setViewer({ ...viewerState, visible: visible, activeIndex: activeIndex });
  };

  return (
    <AppViewer
      visible={viewerState.visible}
      images={{
        src: 'https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/fisher-uploads/2022-12-18/N6S6N9XZXDQKFSG46L58UK.png',
        alt: '图片',
      }}
      activeIndex={viewerState.activeIndex}
      onViewerOpen={handleViewerOpen}
      onViewerClose={handleViewClose}
    />
  );
};
