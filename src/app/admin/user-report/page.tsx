"use client";

import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { USER_REPORTS, UserReport, ReportStatus, ReportCategory, ReportPriority } from '@/lib/admin/reports';
import { ReportCard, ReportDetailModal } from '@/components/admin/user-report';
import FixedAdminSidebar from '@/components/ui/fixedadminsidebar';

type DateRange = 'Last 7 days' | 'Last 14 days' | 'Last 30 days' | 'All times';

export default function UserReportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'All'>('All');
  const [dateRange, setDateRange] = useState<DateRange>('Last 7 days');
  const [categoryFilter, setCategoryFilter] = useState<ReportCategory | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<ReportPriority | 'All'>('All');
  const [selectedReport, setSelectedReport] = useState<UserReport | null>(null);
  
  // Collapse states for filter sections
  const [isStatusOpen, setIsStatusOpen] = useState(true);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriorityOpen, setIsPriorityOpen] = useState(true);

  // Filter reports
  const filteredReports = useMemo(() => {
    let reports = [...USER_REPORTS];

    // Search filter
    if (searchQuery) {
      reports = reports.filter(
        (report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      reports = reports.filter((report) => report.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'All') {
      reports = reports.filter((report) => report.category === categoryFilter);
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      reports = reports.filter((report) => report.priority === priorityFilter);
    }

    // Date range filter
    if (dateRange !== 'All times') {
      const now = new Date('Nov 26, 2025');
      const daysMap: Record<DateRange, number> = {
        'Last 7 days': 7,
        'Last 14 days': 14,
        'Last 30 days': 30,
        'All times': Infinity
      };
      const days = daysMap[dateRange];
      
      reports = reports.filter((report) => {
        const reportDate = new Date(report.dateSubmitted);
        const diffTime = Math.abs(now.getTime() - reportDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
      });
    }

    return reports;
  }, [searchQuery, statusFilter, dateRange, categoryFilter, priorityFilter]);

  return (
    <div className="flex min-h-screen bg-[#FAF7F3]">
      {/* Admin Sidebar */}
      <FixedAdminSidebar />

      {/* Main Content with Left Padding for Fixed Sidebar */}
      <div className="flex flex-1 ml-64">
        {/* Filter Sidebar */}
        <div className="w-64 bg-[#FAF7F3] border-r border-gray-200 p-6 space-y-6">
          {/* Status */}
          <div>
            <h3 
              className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between cursor-pointer hover:text-[#094CA4] transition-colors"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
            >
              Status
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isStatusOpen ? '' : '-rotate-90'}`} />
            </h3>
            {isStatusOpen && (
              <div className="space-y-2">
                {['All', 'New', 'Pending Review', 'Under Review', 'Resolved'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={statusFilter === status || (status === 'All' && statusFilter === 'All')}
                      onChange={() => setStatusFilter(status as ReportStatus | 'All')}
                      className="w-4 h-4 rounded border-gray-300 text-[#094CA4] focus:ring-[#094CA4]"
                    />
                    <span className="text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Date Range */}
          <div>
            <h3 
              className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between cursor-pointer hover:text-[#094CA4] transition-colors"
              onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
            >
              Date Range
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDateRangeOpen ? '' : '-rotate-90'}`} />
            </h3>
            {isDateRangeOpen && (
              <div className="space-y-2">
                {(['Last 7 days', 'Last 14 days', 'Last 3 Months', 'All times'] as DateRange[]).map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dateRange === range}
                      onChange={() => setDateRange(range)}
                      className="w-4 h-4 rounded border-gray-300 text-[#094CA4] focus:ring-[#094CA4]"
                    />
                    <span className="text-sm text-gray-700">{range}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <h3 
              className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between cursor-pointer hover:text-[#094CA4] transition-colors"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              Category
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? '' : '-rotate-90'}`} />
            </h3>
            {isCategoryOpen && (
              <div className="space-y-2">
                {['All', 'Course Issues', 'Instructor', 'Resources', 'Platform', 'Payment', 'Certificate', 'Technical Issues'].map((cat) => {
                  const mappedCategory = cat === 'Course Issues' ? 'Course Issue' : 
                                        cat === 'Instructor' ? 'Instructor Issue' :
                                        cat === 'Technical Issues' ? 'Technical Issue' :
                                        cat === 'Certificate' ? 'Certificate Issue' : cat;
                  return (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryFilter === mappedCategory || (cat === 'All' && categoryFilter === 'All')}
                        onChange={() => setCategoryFilter(mappedCategory as ReportCategory | 'All')}
                        className="w-4 h-4 rounded border-gray-300 text-[#094CA4] focus:ring-[#094CA4]"
                      />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Priority */}
          <div>
            <h3 
              className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between cursor-pointer hover:text-[#094CA4] transition-colors"
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
            >
              Priority
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPriorityOpen ? '' : '-rotate-90'}`} />
            </h3>
            {isPriorityOpen && (
              <div className="space-y-2">
                {['Urgent', 'High', 'Medium', 'Low'].map((priority) => (
                  <label key={priority} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={priorityFilter === priority}
                      onChange={() => setPriorityFilter(priority as ReportPriority)}
                      className="w-4 h-4 rounded border-gray-300 text-[#094CA4] focus:ring-[#094CA4]"
                    />
                    <span className="text-sm text-gray-700">{priority}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reports Content */}
        <div className="flex-1 p-6 bg-[#FAF7F3]">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
              />
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onClick={() => setSelectedReport(report)}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}