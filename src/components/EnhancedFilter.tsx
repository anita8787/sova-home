import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X, ChevronDown, Search, Sliders } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
  color?: string;
}

interface FilterGroup {
  id: string;
  name: string;
  type: 'checkbox' | 'radio' | 'color' | 'range';
  options: FilterOption[];
}

interface EnhancedFilterProps {
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters: () => void;
  className?: string;
}

const EnhancedFilter: React.FC<EnhancedFilterProps> = ({
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearFilters,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // 計算活動篩選器數量
  const activeFilterCount = Object.values(activeFilters).flat().length;

  // 初始化展開的群組
  useEffect(() => {
    const initialExpanded = new Set(filterGroups.slice(0, 2).map(group => group.id));
    setExpandedGroups(initialExpanded);
  }, [filterGroups]);

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleFilterToggle = (groupId: string, optionId: string) => {
    const currentFilters = activeFilters[groupId] || [];
    const isActive = currentFilters.includes(optionId);
    onFilterChange(groupId, optionId, !isActive);
  };

  const getActiveFiltersDisplay = () => {
    const activeItems: { groupId: string; optionId: string; label: string }[] = [];
    
    Object.entries(activeFilters).forEach(([groupId, optionIds]) => {
      const group = filterGroups.find(g => g.id === groupId);
      if (group) {
        optionIds.forEach(optionId => {
          const option = group.options.find(o => o.id === optionId);
          if (option) {
            activeItems.push({
              groupId,
              optionId,
              label: `${group.name}: ${option.name}`
            });
          }
        });
      }
    });

    return activeItems;
  };

  const filteredGroups = filterGroups.filter(group =>
    searchTerm === '' || 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.options.some(option => 
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-sova-sand/20 ${className}`}>
      {/* 篩選器標題列 */}
      <div className="flex items-center justify-between p-4 border-b border-sova-sand/20">
        <div className="flex items-center space-x-3">
          <Sliders className="w-5 h-5 text-sova-primary" />
          <h3 className="font-semibold text-sova-primary">篩選器</h3>
          {activeFilterCount > 0 && (
            <Badge className="bg-sova-accent text-white px-2 py-1 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearFilters}
              className="text-sova-mocha hover:text-sova-primary text-sm px-3 py-1"
            >
              清除全部
            </Button>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 活動篩選器標籤 */}
      {activeFilterCount > 0 && (
        <div className="p-4 border-b border-sova-sand/20">
          <div className="flex flex-wrap gap-2">
            {getActiveFiltersDisplay().map((item, index) => (
              <Badge
                key={`${item.groupId}-${item.optionId}-${index}`}
                className="bg-sova-primary text-white pl-3 pr-1 py-1 flex items-center space-x-2 text-sm"
              >
                <span>{item.label}</span>
                <button
                  onClick={() => handleFilterToggle(item.groupId, item.optionId)}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 搜尋框 */}
      <div className="p-4 border-b border-sova-sand/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sova-mocha w-4 h-4" />
          <input
            type="text"
            placeholder="搜尋篩選選項..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-sova-sand rounded-lg focus:border-sova-primary focus:ring-2 focus:ring-sova-primary/20 outline-none transition-all duration-300"
          />
        </div>
      </div>

      {/* 篩選器群組 */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="max-h-96 overflow-y-auto">
          {filteredGroups.map((group) => (
            <div key={group.id} className="border-b border-sova-sand/10 last:border-b-0">
              {/* 群組標題 */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-sova-linen/30 transition-colors duration-200"
              >
                <span className="font-medium text-sova-primary">{group.name}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-sova-mocha transition-transform duration-200 ${
                    expandedGroups.has(group.id) ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* 群組選項 */}
              {expandedGroups.has(group.id) && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {group.options.map((option) => {
                      const isActive = activeFilters[group.id]?.includes(option.id) || false;

                      if (group.type === 'color') {
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleFilterToggle(group.id, option.id)}
                            className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-all duration-200 ${
                              isActive 
                                ? 'bg-sova-primary/10 border-2 border-sova-primary' 
                                : 'hover:bg-sova-linen/50 border-2 border-transparent'
                            }`}
                          >
                            <div 
                              className={`w-6 h-6 rounded-full border-2 ${
                                isActive ? 'border-sova-primary' : 'border-sova-sand'
                              }`}
                              style={{ backgroundColor: option.color }}
                            />
                            <span className="text-sm text-sova-mocha">{option.name}</span>
                            {option.count && (
                              <span className="text-xs text-sova-mocha/60 ml-auto">
                                ({option.count})
                              </span>
                            )}
                          </button>
                        );
                      }

                      return (
                        <label
                          key={option.id}
                          className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            isActive 
                              ? 'bg-sova-primary/10' 
                              : 'hover:bg-sova-linen/50'
                          }`}
                        >
                          <input
                            type={group.type === 'radio' ? 'radio' : 'checkbox'}
                            name={group.type === 'radio' ? group.id : undefined}
                            checked={isActive}
                            onChange={() => handleFilterToggle(group.id, option.id)}
                            className="w-4 h-4 text-sova-primary border-sova-sand rounded focus:ring-sova-primary/20"
                          />
                          <span className="text-sm text-sova-mocha flex-1">{option.name}</span>
                          {option.count && (
                            <span className="text-xs text-sova-mocha/60">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 無結果狀態 */}
      {filteredGroups.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-sova-mocha/60">
            <Filter className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">找不到符合的篩選選項</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSearchTerm('')}
              className="mt-2 text-sova-primary"
            >
              清除搜尋
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedFilter;