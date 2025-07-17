import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Textbox from '../components/Textbox';
import SelectBox from '../components/SelectBox';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { useToast } from "@/hooks/use-toast";
import { Download, Plus, Search } from 'lucide-react';

const RateMatrix = () => {
  const { toast } = useToast();
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
  });

  useEffect(() => {
    loadRates();
  }, [filters]);

  const loadRates = async () => {
    try {
      setLoading(true);
      const response = await api.getRates(filters);
      setRates(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load rate matrix data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRowAction = (action, row) => {
    if (action === 'edit') {
      toast({
        title: "Edit Rate",
        description: `Edit functionality for ${row.name} would be implemented here`,
      });
    } else if (action === 'menu') {
      toast({
        title: "More Actions",
        description: `Additional actions for ${row.name} would be shown here`,
      });
    }
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
  ];

  const getCategoryBadgeVariant = (category) => {
    switch (category) {
      case 'standard':
        return 'default';
      case 'premium':
        return 'secondary';
      case 'enterprise':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'inactive':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const columns = [
    {
      key: 'code',
      title: 'Rate Code',
      render: (value) => (
        <span className="font-mono text-sm font-medium text-slate-900">
          {value}
        </span>
      ),
    },
    {
      key: 'name',
      title: 'Name',
      render: (value) => (
        <span className="font-medium text-slate-900">
          {value}
        </span>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (value) => (
        <Badge variant={getCategoryBadgeVariant(value)} className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: 'baseRate',
      title: 'Base Rate',
      render: (value) => (
        <span className="font-medium text-slate-900">
          ${value}
        </span>
      ),
    },
    {
      key: 'multiplier',
      title: 'Multiplier',
      render: (value) => (
        <span className="text-slate-600">
          {value}x
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <Badge variant={getStatusBadgeVariant(value)} className="capitalize">
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Rate Matrix</h1>
          <p className="text-slate-600">Manage pricing rates and matrix configurations</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Rate
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Textbox
                  placeholder="Search by name, code, or category..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              </div>
            </div>

            {/* Category Filter */}
            <SelectBox
              placeholder="All Categories"
              value={filters.category}
              onValueChange={(value) => handleFilterChange('category', value)}
              options={categoryOptions}
            />

            {/* Status Filter */}
            <SelectBox
              placeholder="All Status"
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
              options={statusOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Rate Matrix Table */}
      <DataTable
        data={rates}
        columns={columns}
        loading={loading}
        selection={true}
        pagination={true}
        onRowAction={handleRowAction}
      />
    </div>
  );
};

export default RateMatrix;
