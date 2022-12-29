import React, { useState } from 'react';
import AppViewer from '../index';

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
      activeIndex={viewerState.activeIndex}
      onViewerOpen={handleViewerOpen}
      onViewerClose={handleViewClose}
    />
  );
};
