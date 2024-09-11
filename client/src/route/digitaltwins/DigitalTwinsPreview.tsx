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
import tabs from './DigitalTwinTabData';
import CreateTab from './CreateTab';

const createDTTab = (
  error: string | null,
  gitlabInstance: GitlabInstance,
): TabData[] =>
  tabs
    .filter((tab) => tab.label === 'Manage' || tab.label === 'Execute' || tab.label === 'Create')
    .map((tab) => ({
      label: tab.label,
      body: (
        <>
          <Typography variant="body1">{tab.body}</Typography>
          {tab.label === 'Manage' || tab.label === 'Execute' ? ( 
          <AssetBoard
            tab={tab.label}
            gitlabInstance={gitlabInstance}
            error={error}
          />)
          : (
        <CreateTab />
          )
        }
          {/* create tab */}
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
      const subfolders = await gitlabInstance.getDTSubfolders(
        gitlabInstance.projectId,
      );
      dispatch(setAssets(subfolders)); // Dispatcha gli asset nel Redux store
    } else {
      dispatch(setAssets([]));
    }
  } catch (error) {
    setError('An error occurred');
  }
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
    fetchSubfolders(gitlabInstance, dispatch, setError);
  }, [dispatch]);

  return (
    <Layout>
      <TabComponent assetType={createDTTab(error, gitlabInstance)} scope={[]} />
    </Layout>
  );
}

export default DTContent;
