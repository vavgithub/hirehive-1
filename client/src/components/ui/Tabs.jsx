import { Tabs as TabsRoot, TabsList, TabsTrigger } from '@/components/shadcn/tabs'

const Tabs = ({ tabs = [], activeTab, handleTabClick }) => {
  return (
    <TabsRoot value={activeTab} onValueChange={handleTabClick}>
      <TabsList aria-label="Sections">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.name}>
            {activeTab === tab.name ? (tab.activeIcon || tab.icon) : tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsRoot>
  )
}

export default Tabs
