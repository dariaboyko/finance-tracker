import { message, Modal, Form, DatePicker, Input, Button } from 'antd';
import { useState } from 'react';
import { getAccountStatement } from 'services/statsService';
import PropTypes from 'prop-types';
import './download-report-modal.scss';
import { getUserRole } from 'utils/tokenService';

interface DownloadReportModalProps {
  visible: boolean;
  onClose: () => void;
}

const DownloadReportModal: React.FC<DownloadReportModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadReport = async (values: any) => {
    const userRole = getUserRole();
    console.log(userRole);
    if (userRole !== 'UserPremium') {
      message.error('You do not have permission for this action. Please buy premium');
      return;
    }

    setLoading(true);
    try {
      const response = await getAccountStatement(values.fromDate, values.toDate);

      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'account-statements.pdf';
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(downloadUrl);

      message.success('Report downloaded successfully');
      onClose();
    } catch (error) {
      message.error('Failed to download report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Download Report"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="download-report-modal">
      <Form layout="vertical" onFinish={handleDownloadReport}>
        <Form.Item
          name="fromDate"
          label="From Date"
          rules={[{ required: true, message: 'Please select a from date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="toDate"
          label="To Date"
          rules={[{ required: true, message: 'Please select a to date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Download
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

DownloadReportModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DownloadReportModal;
