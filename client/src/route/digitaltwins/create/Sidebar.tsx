import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

interface DataItem {
  id: string;
  name: string;
}

const Sidebar = () => {
  const [descriptionData, setDescriptionData] = useState<DataItem[]>([]);
  const [configData, setConfigData] = useState<DataItem[]>([]);

  // Simulate API call to fetch data
  useEffect(() => {
    // Mock data for Description and Config
    const fetchData = async () => {
      const descriptionResponse = [
        { id: '1', name: 'Digital Twin' },
        { id: '2', name: 'Asset1' },
        { id: '3', name: 'Asset2' },
      ];
      const configResponse = [
        { id: '1', name: 'Digital Twin' },
        { id: '2', name: 'Asset1' },
        { id: '3', name: 'Asset2' },
        { id: '4', name: 'Service1' },
        { id: '5', name: 'Service2' },
      ];
      
      setDescriptionData(descriptionResponse);
      setConfigData(configResponse);
    };

    fetchData();
  }, []);

  return (
    <Grid 
      container 
      direction="column" 
      sx={{ padding: 2, height: '100%', maxWidth: '300px' }} // Set the maxWidth or width here
    >
      {/* Description Tree */}
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <SimpleTreeView>
        {descriptionData.map((item) => (
          <TreeItem key={item.id} itemId={item.id} label={item.name} />
        ))}
      </SimpleTreeView>

      {/* Config Tree */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
        Config
      </Typography>
      <SimpleTreeView>
        {configData.map((item) => (
          <TreeItem key={item.id} itemId={item.id} label={item.name}>
            {item.name.startsWith('Service') && (
              <TreeItem itemId={`${item.id}-service`} label={`More info for ${item.name}`} />
            )}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </Grid>
  );
};

export default Sidebar;
