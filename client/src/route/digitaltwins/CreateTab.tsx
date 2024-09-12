import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, Tabs, Tab, CircularProgress } from '@mui/material';
// import Editor from '@monaco-editor/react'; // Monaco Editor
import 'react-resizable/css/styles.css'; // Import resizable styles
import { useSelector } from 'react-redux';
import { selectDigitalTwinByName } from 'store/digitalTwin.slice';
import DigitalTwin from 'util/gitlabDigitalTwin';
import EditorTab from './create/EditorTab';
import PreviewTab from './create/PreviewTab';
import Sidebar from './create/Sidebar';

const fetchFilesNames = async (digitalTwin: DigitalTwin) => {
  await digitalTwin.gitlabInstance.init();
  await digitalTwin.getDescriptionFiles();
}

function CreateTab() {
  // const [editorValue, setEditorValue] = useState('# Write some markdown here...');
  const [activeTab, setActiveTab] = useState(0); // Tab state for editor and preview
  const [loading, setLoading] = useState(true);
  const digitalTwin = useSelector(selectDigitalTwinByName('mass-spring-damper'));

  useEffect(() => { 
    fetchFilesNames(digitalTwin);
    setLoading(false);
  }, [digitalTwin]);

  // Function to handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    // console.log('Save action triggered:', editorValue);
  };

  const handleCancel = () => {
    // console.log('Cancel action triggered');
  };

  // Check if digitalTwin is available before rendering the content
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Resizable Left Side Panel */}
      <Sidebar/>

      {/* Right Side Content */}
      <Grid container direction="column" sx={{ flexGrow: 1, padding: 2 }}>
        {/* Tabs for Editor and Preview */}
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="editor preview tabs">
          <Tab label="Editor" />
          <Tab label="Preview" />
        </Tabs>

        {/* Tab Panels */}
        <Box sx={{ flexGrow: 1, padding: 2, border: '1px solid lightgray', marginTop: 2 }}>
          {activeTab === 0 && <EditorTab />}
          {activeTab === 1 && <PreviewTab />}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
          <Button onClick={handleCancel} variant="outlined" color="secondary">Cancel</Button>
          <Button onClick={handleSave} variant="outlined" sx={{ marginRight: 1 }}>Save</Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default CreateTab;
