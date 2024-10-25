import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import OverviewPanel from "./OverviewPanel";
import SubtasksPanel from "./SubtasksPanel";
import CommentsPanel from "./CommentsPanel";
import PropTypes from "prop-types";

const tabs = [
  {
    id: 1,
    tabName: "Ümumi baxış",
  },
  {
    id: 2,
    tabName: "Alt tapşırıqlar",
  },
  {
    id: 3,
    tabName: "Rəylər",
  },
];

Tabs.propTypes = {
  task : PropTypes.any
}

export default function Tabs({ task }) {
  return (
    <TabGroup className={"w-full h-full"}>
      <TabList className={"w-full grid grid-cols-3 gap-5 bg-gray-300/40 p-2"}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            className={
              "data-[selected]:bg-white p-2 rounded-lg data-[selected]:shadow text-sm font-medium transition-all duration-300"
            }
          >
            {tab.tabName}
          </Tab>
        ))}
      </TabList>
      <TabPanels className={"p-5 h-full"}>
        <TabPanel className={'w-full h-full'}>
          <OverviewPanel task={task} />
        </TabPanel>
        <TabPanel className={'w-full h-full'}>
          <SubtasksPanel task={task} />
        </TabPanel>
        <TabPanel className={'w-full h-full'}>
          <CommentsPanel task={task}/>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
