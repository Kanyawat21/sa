import React ,{useState} from "react";
import { IconHome } from "../../components/IconHome";
import "./style.css";
import { Input, message, Upload, Modal,Form,Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ReportInterface } from "../../interfaces/IData";
import { CreateReport } from "../../services/http";
import { useLocation } from "react-router";

export const ReportPage = (): JSX.Element => {
  const location = useLocation();
  const id = location.state?.id;;
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  const [image, setImage] = useState('');
  const [reportData, setReportData] = useState<ReportInterface>({
    Detail: "", // สามารถกำหนดค่าเริ่มต้นเป็นค่าที่ต้องการ
    Picture: "", // สามารถกำหนดค่าเริ่มต้นเป็นค่าที่ต้องการ
    MemberID: 0,
  });
  const [messageApi] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false); // เพิ่ม state สำหรับ Modal
  console.log(userId);
  const onFinish = async (values : ReportInterface) => {
    values.Detail = reportData.Detail;
    values.Picture = image;
    values.MemberID = Number(userId);
    let res = await CreateReport(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setIsModalVisible(true); // เมื่อสำเร็จให้เปิด Modal
    }
    console.log(res);
  }

  const handleOk = () => {
    setIsModalVisible(false); // ปิด Modal เมื่อกด OK
  }

  function onChange(info : any) { //เก็บรูปภาพเป็นString
    info.file.status = 'Done';
    let s = info.file.originFileObj;
    const a = new FileReader();
    a.onload = function(e: any){
      const result = e.target.result;
      console.log(result.slice(0,result.length-1));
      setImage(result.slice(0,result.length-1));
    }
    a.readAsDataURL(s);
  }


  return (
    <div className="report-page" >
      
      <div className="div-4" >
        <div className="overlap-2">
            <div  className="backgound-white-default"/>
            {/*=================================================================================== */}
            <Input.TextArea 
              className="input-box"
              value={reportData.Detail}
              onChange={(e) => {
                setReportData({ ...reportData, Detail: e.target.value });
              }}
              placeholder="Please describe the issue you encountered..."
              autoSize={{ minRows: 10, maxRows: 5 }}
            />
            <Form
            onFinish={onFinish}>
            <Form.Item
              className="upload"
              name="upload"
              label=""
              valuePropName="fileList"
              extra="You can attach screenshort about your issue "
            >
              <Upload name="logo" action="/upload.do" listType="picture" onChange={onChange}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            {/*=================================================================================== */}     
            <Button className="submitButton" type="default" htmlType="submit" style={{backgroundColor:'#FFE663', 
                                                                borderRadius:'28.3px/28.5px', 
                                                                height:55, 
                                                                width:140,
                                                                fontSize:20,
                                                                fontFamily: "Inter,Helvetica",
                                                                boxShadow:"0px 4px 4px #00000040",
                                                                color:'black',
                                                                position:"absolute",
                                                                fontWeight:700}}>Submit</Button>
            </Form.Item>
            </Form>
            {isModalVisible && (
              <Modal title="Submit Success" visible={isModalVisible} onOk={handleOk}>
                Your report has been submitted successfully.
              </Modal>
            )}
            
            <div className="text-wrapper-9">Report an Issue</div>
            <IconHome className="icon-home-2" />
            
        </div>
        
        <div className="pleaseProvide-text">Note: Please provide as much detail as possible to 
              help us understand and address the issue you've encountered. 
              Attaching screenshots or additional documentation can be especially helpful. 
              Thank you for helping us improve our service.</div>
      </div>
    </div>
  );
};