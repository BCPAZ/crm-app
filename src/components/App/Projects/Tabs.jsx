import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import OverviewPanel from "./OverviewPanel";
import SubtasksPanel from "./SubtasksPanel";
import CommentsPanel from "./CommentsPanel";

const tabs = [
  {
    id: 1,
    tabName: "Overview",
  },
  {
    id: 2,
    tabName: "Subtasks",
  },
  {
    id: 3,
    tabName: "Comments",
  },
];

export default function Tabs({ task }) {
  return (
    <TabGroup className={"w-full"}>
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
        <TabPanel>
          <OverviewPanel task={task} />
        </TabPanel>
        <TabPanel>
          <SubtasksPanel task={task} />
        </TabPanel>
        <TabPanel>
          <CommentsPanel task={task}/>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
