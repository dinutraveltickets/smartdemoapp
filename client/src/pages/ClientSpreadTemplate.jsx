import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Textbox from '../components/Textbox';
import SelectBox from '../components/SelectBox';
import { Save, Trash2, Search } from 'lucide-react';
import { cn } from "@/lib/utils";

const ClientSpreadTemplate = () => {
  const [formData, setFormData] = useState({
    tradingDesk: 'Donald Trading Desk',
    businessEntity: 'Donald Invest Entity',
    productCategory: 'Time Deposits',
    product: 'E Timer TD',
    currency: 'USD',
    transactionType: 'Invest',
    serviceLevelName: 'DTD21TDU',
    name: 'DTD21TDU',
    defaultMargin: '',
    minimumMaximumVolume: '1 to 999,999,999',
    applyMarginsToAll: '',
    clientOverride: 'Yes',
    minimumClientRate: '0.000',
    triggerRate: '0.000',
    remember: false,
    lastModifiedTime: 'Feb 10, 2025 11:48:04',
    lastModifiedBy: 'DONALD TRADER USER1',
    todaysDateTime: 'Jul 09, 2025 11:40:27'
  });

  const [tenorData, setTenorData] = useState([
    { id: 1, tenor: 'Overnight', amountRange: '999,999,999', rate: '0.269', triggerRate: '0.000', percentage: '%', checked: false },
    { id: 2, tenor: '1 Week', amountRange: '999,999,999', rate: '0.358', triggerRate: '0.000', percentage: '%', checked: false },
    { id: 3, tenor: '2 Week', amountRange: '999,999,999', rate: '0.458', triggerRate: '0.000', percentage: '%', checked: false },
    { id: 4, tenor: '3 Week', amountRange: '999,999,999', rate: '0.691', triggerRate: '0.000', percentage: '%', checked: false },
    { id: 5, tenor: '1 Month', amountRange: '999,999,999', rate: '0.751', triggerRate: '0.000', percentage: '%', checked: false },
    { id: 6, tenor: '45 Days', amountRange: '999,999,999', rate: '0.845', triggerRate: '0.000', percentage: '%', checked: false },
    { id: 7, tenor: '2 Month', amountRange: '999,999,999', rate: '0.975', triggerRate: '0.000', percentage: '%', checked: false },
    { id: 8, tenor: '4 Month', amountRange: '999,999,999', rate: '1.191', triggerRate: '0.000', percentage: '%', checked: false }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTenorCheck = (id, checked) => {
    setTenorData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked } : item
      )
    );
  };

  const handleTenorRateChange = (id, rate) => {
    setTenorData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, rate } : item
      )
    );
  };

  const handleTenorTriggerRateChange = (id, triggerRate) => {
    setTenorData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, triggerRate } : item
      )
    );
  };

  const tradingDeskOptions = [
    { value: 'Donald Trading Desk', label: 'Donald Trading Desk' },
    { value: 'Other Trading Desk', label: 'Other Trading Desk' }
  ];

  const businessEntityOptions = [
    { value: 'Donald Invest Entity', label: 'Donald Invest Entity' },
    { value: 'Other Entity', label: 'Other Entity' }
  ];

  const productCategoryOptions = [
    { value: 'Time Deposits', label: 'Time Deposits' },
    { value: 'Other Category', label: 'Other Category' }
  ];

  const productOptions = [
    { value: 'E Timer TD', label: 'E Timer TD' },
    { value: 'Other Product', label: 'Other Product' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' }
  ];

  const transactionTypeOptions = [
    { value: 'Invest', label: 'Invest' },
    { value: 'Withdraw', label: 'Withdraw' }
  ];

  const serviceLevelOptions = [
    { value: 'DTD21TDU', label: 'DTD21TDU' },
    { value: 'Other Level', label: 'Other Level' }
  ];

  const overrideOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Client Spread Template</h1>
          <p className="text-slate-600">Select / Create Service Level</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
            <Save className="mr-2 h-4 w-4" />
            Save Spreads
          </Button>
          <Button variant="outline" className="bg-red-500 text-white hover:bg-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Spreads
          </Button>
        </div>
      </div>

      {/* Search Products Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-slate-900">Search Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectBox
              label="Trading Desk:"
              value={formData.tradingDesk}
              onValueChange={(value) => handleInputChange('tradingDesk', value)}
              options={tradingDeskOptions}
            />
            <SelectBox
              label="Business Entity:"
              value={formData.businessEntity}
              onValueChange={(value) => handleInputChange('businessEntity', value)}
              options={businessEntityOptions}
            />
            <div className="flex items-end">
              <label className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  checked={formData.remember}
                  onCheckedChange={(checked) => handleInputChange('remember', checked)}
                />
                <span className="text-sm text-slate-600">Remember</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <SelectBox
              label="Product Category:"
              value={formData.productCategory}
              onValueChange={(value) => handleInputChange('productCategory', value)}
              options={productCategoryOptions}
            />
            <SelectBox
              label="Product:"
              value={formData.product}
              onValueChange={(value) => handleInputChange('product', value)}
              options={productOptions}
            />
            <div className="flex items-end space-x-2">
              <span className="text-sm text-slate-600">Last Modified Time:</span>
              <span className="text-sm font-medium text-slate-900">{formData.lastModifiedTime}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <SelectBox
              label="Currency:"
              value={formData.currency}
              onValueChange={(value) => handleInputChange('currency', value)}
              options={currencyOptions}
            />
            <SelectBox
              label="Transaction Type:"
              value={formData.transactionType}
              onValueChange={(value) => handleInputChange('transactionType', value)}
              options={transactionTypeOptions}
            />
            <div className="flex items-end space-x-2">
              <span className="text-sm text-slate-600">Last Modified By:</span>
              <span className="text-sm font-medium text-slate-900">{formData.lastModifiedBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select Service Level Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectBox
              label="Select Service Level:"
              value={formData.serviceLevelName}
              onValueChange={(value) => handleInputChange('serviceLevelName', value)}
              options={serviceLevelOptions}
            />
            <Textbox
              label="Name:"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <div className="flex items-end space-x-2">
              <span className="text-sm text-slate-600">Today's Date/Time:</span>
              <span className="text-sm font-medium text-slate-900">{formData.todaysDateTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Set up Margins Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-slate-900">Set up Margins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Textbox
                label="Default Margin:"
                value={formData.defaultMargin}
                onChange={(e) => handleInputChange('defaultMargin', e.target.value)}
                placeholder="%"
              />
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Minimum & Maximum Volume Band: 1 to 999,999,999
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <Textbox
                  label="Apply Margins to All Tenors:"
                  value={formData.applyMarginsToAll}
                  onChange={(e) => handleInputChange('applyMarginsToAll', e.target.value)}
                  placeholder="%"
                  className="flex-1"
                />
                <Button className="bg-blue-500 hover:bg-blue-600 text-white mt-6">
                  Apply
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700">Client Override:</span>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="override" value="Yes" checked={formData.clientOverride === 'Yes'} 
                         onChange={(e) => handleInputChange('clientOverride', e.target.value)} />
                  <span className="text-sm text-slate-600">Yes</span>
                  <input type="radio" name="override" value="No" checked={formData.clientOverride === 'No'}
                         onChange={(e) => handleInputChange('clientOverride', e.target.value)} className="ml-4" />
                  <span className="text-sm text-slate-600">No</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Textbox
                  label="Minimum Client Rate:"
                  value={formData.minimumClientRate}
                  onChange={(e) => handleInputChange('minimumClientRate', e.target.value)}
                  placeholder="%"
                />
                <Textbox
                  label="Trigger Rate:"
                  value={formData.triggerRate}
                  onChange={(e) => handleInputChange('triggerRate', e.target.value)}
                  placeholder="%"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenor Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <span className="text-sm font-medium text-slate-700">Legend:</span>
            <span className="text-sm text-slate-600 ml-2">* Disabled Shows</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700">
                    <Checkbox />
                  </th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700">Tenor</th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700">Amount Range</th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700">Client Override</th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700">Minimum Client Rate</th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700">Trigger Rate</th>
                </tr>
              </thead>
              <tbody>
                {tenorData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-3 py-2">
                      <Checkbox 
                        checked={item.checked}
                        onCheckedChange={(checked) => handleTenorCheck(item.id, checked)}
                      />
                    </td>
                    <td className="border border-slate-300 px-3 py-2 text-sm text-slate-900">{item.tenor}</td>
                    <td className="border border-slate-300 px-3 py-2 text-sm text-slate-600">{item.amountRange}</td>
                    <td className="border border-slate-300 px-3 py-2 text-sm text-slate-600">Yes</td>
                    <td className="border border-slate-300 px-3 py-2">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={item.rate}
                          onChange={(e) => handleTenorRateChange(item.id, e.target.value)}
                          className="w-20 px-2 py-1 text-sm border border-slate-300 rounded"
                        />
                        <span className="ml-1 text-sm text-slate-600">%</span>
                      </div>
                    </td>
                    <td className="border border-slate-300 px-3 py-2">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={item.triggerRate}
                          onChange={(e) => handleTenorTriggerRateChange(item.id, e.target.value)}
                          className="w-20 px-2 py-1 text-sm border border-slate-300 rounded"
                        />
                        <span className="ml-1 text-sm text-slate-600">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSpreadTemplate;