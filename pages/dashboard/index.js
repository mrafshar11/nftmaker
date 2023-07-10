import Head from "next/head";
import Link from "next/link";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import FormData from 'form-data';
import { Row, Col, Input, Button } from "antd";
import {
  CloudUploadOutlined,
  DownloadOutlined,
  CopyrightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import Header from "../../components/header";

const baseUrl = "https://zero-right-api-l4ykvsnt5a-uw.a.run.app";
// const baseUrl = "http://0.0.0.0:8080";
const addUrl = baseUrl + "/file_validation/";


axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log(error);
  }
  return Promise.reject(error);
});

/* eslint-enable no-template-curly-in-string */

export default function Home() {
  const { data: session } = useSession();
  const [decodedToken, setDecodedToken] = useState();

  const [fileUrl, setFileUrl] = useState("");
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaFile, setmediaFile] = useState([]);

  const jwtsecret = process.env.JWT_SECRET;
  const url1 = process.env.URL1;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token, jwtsecret);
    if (Date.now() / 1000 < parseInt(decoded?.exp)) {
      setDecodedToken(decoded);
    }
  }, []);

  const onChange = (e) => {
    if (mediaFile.length === 0) {
      setFileUrl(e.target.value);
      setMediaItems([
        <div className="media-container">
          <img
            src={e.target.value}
            style={{ width: "350px", height: "300px" }}
          />
        </div>,
      ]);
    }
  };

  const addFile = (e) => {
    let file = e.target.files[0];

    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 3000000
    ) {
      const reader = new FileReader();
      let files = [...mediaFile];
      files[0] = file;
      setmediaFile(files);

      reader.onload = function (e) {
        let srcValue = e.target.result;

        setMediaItems([
          <div className="media-container">
            <img src={srcValue} style={{ width: "350px", height: "300px" }} />
          </div>,
        ]);
      };

      reader.readAsDataURL(file);
    } else if (file && file.type === "video/mp4" && file.size < 5000000) {
      const reader = new FileReader();
      let files = [...mediaFile];

      files[0] = file;
      setmediaFile(files);

      reader.onload = function (e) {
        let srcValue = e.target.result;

        setMediaItems([
          <div className="post-file">
            <video controls>
              <source src={srcValue} />
            </video>
          </div>,
        ]);
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: "error",
        text: "Please verify your file before submission!",
        confirmButtonText: "agree",
      });
    }
  };


//   const handleSend1 = async () => {
//     console.log(mediaFile);
//     let sendingData = new FormData();
//     sendingData.append("file", mediaFile[0]);
//     console.log(sendingData);

//     const res = await fetch(
//       "https://zero-right-api-l4ykvsnt5a-uw.a.run.app/file_validation/",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: sendingData,
//       }
//     );
//     console.log(res);
//   };


  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    console.log('file is ok', mediaFile);
    const sendingData = new FormData();
    const userRiid = '6486a1dd851585cf965d58d0';
    const metaDataJson = '{"name": "Hi"}';
    sendingData.append("file", mediaFile[0]);
    sendingData.append('riid', userRiid);
    sendingData.append('meta_data', metaDataJson);

    console.log('sendingdata', sendingData);
    setLoading(true);

    try {
        const response = await axios.post(addUrl, sendingData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            riid: userRiid,
            meta_data: metaDataJson
          }
        });
        
        // Handle the response here
        console.log(response)
        if (response.status === 200) {
            // Assuming the response contains a 'results' property as a list of dictionaries
            const results = response.data.body;
            setResults(results);
            setError(null);
          } else {
            
            setError(error.message || 'API request failed.');
          }
        
    } catch (error) {
        setError(error.message || 'API request failed call.');
    } finally {
      setLoading(false);
    }
    
  };

  if (!decodedToken) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <p> Login Expired</p>
        <Button
          href="/login"
          block={true}
          style={{
            backgroundColor: "rgb(125 211 252)",
            color: "rgb(15 23 42)",
            width: "150px",
          }}
        >
          Login Expired, Please Login Again
        </Button>
      </div>
    );
  }

  const handleRemoveMedia = () => {
    console.log("ok");
    setmediaFile([]);
    setMediaItems([]);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section style={{ borderRadius: "8px", marginTop: "20px" }}>
        <div className="container">
          <Header />
          <Row>
            <Col
              lg={{ span: 10, offset: 7 }}
              md={{ span: 7 }}
              sm={{ span: 8 }}
              xs={{ span: 8 }}
              className="media-input"
              style={{
                marginTop: "50px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="choose-file"
                className="choose-label"
                style={{ display: mediaItems.length > 0 ? "none" : "block" }}
              >
                <CloudUploadOutlined style={{ fontSize: "70px" }} />
              </label>
              <label
                style={{ display: mediaItems.length > 0 ? "none" : "block" }}
                htmlFor="choose-file"
                className="choose-label2"
              >
                upload your media file here
              </label>
              <input
                hidden={true}
                type="file"
                id="choose-file"
                name="storyFile"
                onChange={(e) => {
                  return addFile(e);
                }}
              />
              {mediaItems}
              <DeleteOutlined
                onClick={handleRemoveMedia}
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  fontSize: "21px",
                  display: mediaItems.length > 0 ? "block" : "none",
                  cursor: "pointer",
                }}
              />
            </Col>
            <Col
              lg={{ span: 10, offset: 7 }}
              md={{ span: 7 }}
              sm={{ span: 8 }}
              xs={{ span: 8 }}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              {/* <p className="dest">or</p> */}
            </Col>
            <Col
              lg={{ span: 10, offset: 7 }}
              md={{ span: 7 }}
              sm={{ span: 8 }}
              xs={{ span: 8 }}
              className="media-input-url"
              style={{ marginBottom: "10px" }}
            >
              <Row>
                {/* <Col lg={{ span: 19 }}>
                  <Input
                    onChange={onChange}
                    placeholder="Enter image URL"
                    style={{ display: "inline-block" }}
                    size="large"
                  />
                </Col> */}
                <Col lg={{ span: 16, offset: 4 }} 
                        style={{
                        alignItems: "center",
                        textAlign: "center",
                        position: "relative",
                    }}>
                  <Button
                    type="primary"
                    size="large"
                    block={true}
                    onClick={(e) => {
                        return handleSend(e);
                      }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "100px", marginBottom: "50px" }}>
            <Col md={{ span: 16, offset: 4 }}>
              <h2 style={{ fontSize: "25px" }}>Media History</h2>
            </Col>
            
           
              <Col md={{ span: 16, offset: 4 }} style={{ marginTop: "50px" }}>
                <Row style={{ alignItems: "center" }}>
                    <Col md={{ span: 2 }}>{results.date_time || ""} </Col>
                    { results.length > 0 && (<Col md={{ span: 2, offset: 2 }}>
                    <Image
                        width={55}
                        height={55}
                        src={results.original_media}
                        style={{ borderRadius: "10px" }}
                    />
                    </Col>
                    )}
                    { Object.keys(results).length > 0 && (<Col md={{ span: 3, offset: 0 }}>
                        <Link
                            id="opensea"
                            style={{ fontSize: "32px", color: "#9c9ea1" }}
                            href= {results.opensea_link}
                            target="_blank" >
                            <Button variant="contained" color="secondary">Market Place</Button>
                        </Link>
                    </Col>)
                    }
                    { Object.keys(results).length > 0 && (<Col md={{ span: 3, offset: 1 }}>
                        <Link
                            style={{ fontSize: "32px", color: "#9c9ea1" }}
                            href={results.etherscan_link}
                            target="_blank" >
                            <Button variant="contained" color="secondary">Etherscan link</Button>
                        </Link>
                    </Col>
                    )}
                    { Object.keys(results).length > 0 && (<Col md={{ span: 3, offset: 1 }}>
                        <Link
                            style={{ fontSize: "32px", color: "#9c9ea1" }}
                            href={results.original_media || "#"}
                            target="_blank" >
                            <Button variant="contained" color="secondary"> Original Media </Button>
                        </Link>
                    </Col>
                    )}
                    { Object.keys(results).length > 0 && (<Col md={{ span: 2, offset: 1 }}>
                        <Link
                            style={{ fontSize: "32px", color: "#9c9ea1" }}
                            href={results.watermark_media || "#"}
                            target="_blank" >
                            <Button variant="contained" color="secondary"> Replica </Button>
                        </Link>
                    </Col>
                    )}
                
                
              </Row>
            </Col>
            <Col md={{ span: 16, offset: 4 }} style={{ marginTop: "30px" }}>
              <Row style={{ alignItems: "center" }}>
              <Col md={{ span: 2 }}>#102</Col>
                <Col md={{ span: 2 }}>06/02/2023</Col>
                <Col md={{ span: 2, offset: 1 }}>
                  <Image
                    width={55}
                    height={55}
                    src={"/images/ZeroRight.svg"}
                    style={{ borderRadius: "10px" }}
                  />
                </Col>
                <Col md={{ span: 3, offset: 0 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://testnets.opensea.io/assets/goerli/0xd76f5c1f86677e942a8443e8968b2548925025f1/46"
                        target="_blank" >
                        <Button variant="contained" color="secondary">Market Place</Button>
                    </Link>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://Goerli.etherscan.io/tx/0x75220d13f15102e4585be36918f8db3fc9762618650117a7b8c72b276d216c8b"
                        target="_blank" >
                        <Button variant="contained" color="secondary">Etherscan Link</Button>
                    </Link>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://Goerli.etherscan.io/tx/0x75220d13f15102e4585be36918f8db3fc9762618650117a7b8c72b276d216c8b"
                        target="_blank" >
                        <Button variant="contained" color="secondary"> Original Media </Button>
                    </Link>
                </Col>
                <Col md={{ span: 2, offset: 1 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://Goerli.etherscan.io/tx/0x75220d13f15102e4585be36918f8db3fc9762618650117a7b8c72b276d216c8b"
                        target="_blank" >
                        <Button variant="contained" color="secondary"> Replica </Button>
                    </Link>
                </Col>
                <Col md={{ span: 2, offset: 1 }}>
                  <Link
                    style={{ fontSize: "22px", color: "#9c9ea1" }}
                    href="https://storage.googleapis.com/download/storage/v1/b/zeroright-nft/o/6486a1dd851585cf965d58d0%2F2023%2F06%2F25%2F01:25:20_data%2F2.txt?generation=1687681495754872&alt=media"
                    target="_blank"> 
                    <DownloadOutlined />
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col md={{ span: 16, offset: 4 }} style={{ marginTop: "30px" }}>
              <Row style={{ alignItems: "center" }}>
              <Col md={{ span: 2 }}>#103</Col>
                <Col md={{ span: 2 }}>06/03/2023</Col>
                <Col md={{ span: 2, offset: 1 }}>
                  <Image
                    width={55}
                    height={55}
                    src={"/images/ZeroRight.svg"}
                    style={{ borderRadius: "10px" }}
                  />
                </Col>
                <Col md={{ span: 3, offset: 0 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://testnets.opensea.io/assets/goerli/0xd76f5c1f86677e942a8443e8968b2548925025f1/46"
                        target="_blank" >
                        <Button variant="contained" color="secondary">Market Place</Button>
                    </Link>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://Goerli.etherscan.io/tx/0x75220d13f15102e4585be36918f8db3fc9762618650117a7b8c72b276d216c8b"
                        target="_blank" >
                        <Button variant="contained" color="secondary">Etherscan Link</Button>
                    </Link>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://Goerli.etherscan.io/tx/0x75220d13f15102e4585be36918f8db3fc9762618650117a7b8c72b276d216c8b"
                        target="_blank" >
                        <Button variant="contained" color="secondary"> Original Media </Button>
                    </Link>
                </Col>
                <Col md={{ span: 2, offset: 1 }}>
                    <Link
                        style={{ fontSize: "32px", color: "#9c9ea1" }}
                        href="https://Goerli.etherscan.io/tx/0x75220d13f15102e4585be36918f8db3fc9762618650117a7b8c72b276d216c8b"
                        target="_blank" >
                        <Button variant="contained" color="secondary"> Replica </Button>
                    </Link>
                </Col>
                <Col md={{ span: 2, offset: 1 }}>
                  <Link
                    style={{ fontSize: "22px", color: "#9c9ea1" }}
                    href="https://storage.googleapis.com/download/storage/v1/b/zeroright-nft/o/6486a1dd851585cf965d58d0%2F2023%2F06%2F25%2F01:25:20_data%2F2.txt?generation=1687681495754872&alt=media"
                    target="_blank"> 
                    <DownloadOutlined />
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}
