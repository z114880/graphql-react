import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

function NextLaunch() {
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
  ];
  useEffect(() => {
    axios
      .post("https://api.spacex.land/graphql/", {
        query: `{
          launchNext {
            launch_date_local
            id
            launch_site {
              site_name_long
            }
            launch_success
            links {
              article_link
              video_link
            }
            rocket {
              rocket_name
              rocket_type
            }
            details
            mission_name
          }
        }`,
      })
      .then((res) => {
        const resData = res.data.data;
        console.log(resData);
        const dataSource = [];
        resData?.launchNext &&
          dataSource.push({
            mission_name: resData?.launchNext.mission_name,
            id: resData?.launchNext.id,
            launch_date_local: resData?.launchNext.launch_date_local,
            launch_site: resData?.launchNext.launch_site.site_name_long,
            links: resData?.launchNext.links,
            rocket: resData?.launchNext.rocket,
            details: resData?.launchNext.details || "no data",
            key: resData?.launchNext.id,
          });
        console.log(dataSource);
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

export default NextLaunch;
