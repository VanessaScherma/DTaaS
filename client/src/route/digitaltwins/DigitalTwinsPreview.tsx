import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import Layout from 'page/Layout';
import TabComponent from 'components/tab/TabComponent';
import { TabData } from 'components/tab/subcomponents/TabRender';
import AssetBoard from 'components/asset/AssetBoard';
import { GitlabInstance } from 'util/gitlab';
import { getAuthority } from 'util/envUtil';
import { setAssets } from 'store/assets.slice';
import { setDigitalTwin } from 'store/digitalTwin.slice';
import { Asset } from 'components/asset/Asset';
import DigitalTwin from 'util/gitlabDigitalTwin';
import tabs from './DigitalTwinTabData';
import CreateTab from './CreateTab';

const createDTTab = (error: string | null): TabData[] =>
  tabs
    .filter((tab) => tab.label === 'Manage' || tab.label === 'Execute' || tab.label === 'Create')
    .map((tab) => ({
      label: tab.label,
      body: (
        <>
          <Typography variant="body1">{tab.body}</Typography>
          {tab.label === 'Manage' || tab.label === 'Execute' ? (
            <AssetBoard tab={tab.label} error={error} />
          ) : (
            <CreateTab />
          )}
        </>
      ),
    }));

export const fetchSubfolders = async (
  gitlabInstance: GitlabInstance,
  dispatch: ReturnType<typeof useDispatch>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    await gitlabInstance.init();
    if (gitlabInstance.projectId) {
      const subfolders = await gitlabInstance.getDTSubfolders(gitlabInstance.projectId);
      dispatch(setAssets(subfolders));
      return subfolders; // Add this line to return the subfolders array
    } 
      dispatch(setAssets([]));
      return []; // Add this line to return an empty array
  } catch (error) {
    setError('An error occurred');
    return []; // Add this line to return an empty array
  }
};

const createDigitalTwinsForAssets = (
  assets: Asset[],
  dispatch: ReturnType<typeof useDispatch>
) => {
  assets.forEach((asset) => {
    const gitlabInstance = new GitlabInstance(
      sessionStorage.getItem('username') || '',
      getAuthority(),
      sessionStorage.getItem('access_token') || '',
    );
    const digitalTwin = new DigitalTwin(asset.name, gitlabInstance);
    dispatch(setDigitalTwin({ assetName: asset.name, digitalTwin }));
  });
};

function DTContent() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const gitlabInstance = new GitlabInstance(
    sessionStorage.getItem('username') || '',
    getAuthority(),
    sessionStorage.getItem('access_token') || '',
  );

  useEffect(() => {
    fetchSubfolders(gitlabInstance, dispatch, setError).then((assets) => {
      if (assets) {
        createDigitalTwinsForAssets(assets, dispatch);
      }
    });
  }, [dispatch]);

  return (
    <Layout>
      <TabComponent assetType={createDTTab(error)} scope={[]} />
    </Layout>
  );
}

export default DTContent;
