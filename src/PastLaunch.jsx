import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag } from "antd";

function PastLaunch() {
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mission Name",
      dataIndex: "mission_name",
      key: "mission_name",
    },
    {
      title: "Launch Date Local",
      dataIndex: "launch_date_local",
      key: "launch_date_local",
    },
    {
      title: "launch Site",
      dataIndex: "launch_site",
      key: "launch_site",
    },
    {
      title: "Link",
      dataIndex: "links",
      width: "100px",
      render: (record) => {
        return (
          <div>
            {
              <div>
                {record.article_link && (
                  <a href={record.article_link}>article link</a>
                )}
                <br />
                {record.article_link && (
                  <a href={record.video_link}>video link</a>
                )}
              </div>
            }
          </div>
        );
      },
    },
    {
      title: "Rocket",
      dataIndex: "rocket",
      width: "180px",
      render: (record) => {
        return (
          <div>
            <div>
              rocket name:{" "}
              <span className="spanStyle">{record.rocket_name}</span>
            </div>
            <div>
              rocket type:{" "}
              <span className="spanStyle">{record.rocket_type}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Launch Status",
      dataIndex: "launch_success",
      render: (record) => {
        return (
          <div>
            {record ? (
              <Tag color="success">success</Tag>
            ) : (
              <Tag color="error">fail</Tag>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    axios
      .post("https://api.spacex.land/graphql/", {
        query: `{
            launchesPast(limit: 10) {
              id
              mission_name
              launch_date_local
              launch_site {
                site_name_long
              }
              links {
                article_link
                video_link
              }
              rocket {
                rocket_name
                rocket_type
              }
              launch_success
              details
            }
          }`,
      })
      .then((res) => {
        const resData = res.data.data;
        const dataSource = [];
        resData?.launchesPast &&
          resData?.launchesPast.forEach((item) => {
            dataSource.push({
              mission_name: item.mission_name,
              id: item.id,
              launch_date_local: item.launch_date_local,
              launch_site: item.launch_site.site_name_long,
              links: item.links,
              rocket: item.rocket,
              details: item.details || "no data",
              launch_success: item.launch_success,
              key: item.id,
            });
          });
        setTableData(dataSource);
      });
  }, []);
  return (
    <div className="Past">
      <Table
        dataSource={tableData}
        columns={columns}
        bordered
        pagination={false}
      />
    </div>
  );
}

export default PastLaunch;
