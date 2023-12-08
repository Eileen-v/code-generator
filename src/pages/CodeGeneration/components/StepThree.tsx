import { tableOrigin } from '@/services/codeGeneration/codeGeneration'
import { databaseList } from '@/services/dataSource/dataSource'
import { ProCard, ProTable } from '@ant-design/pro-components'
import { Menu, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../index.less'
import TableItem from './TableItem'

const StepThree: React.FC = ({
  tableNames,
  setTableNames,
  handleTablesData,
  tableData,
  setTableData,
}) => {
  const actionRef = useRef < ActionType > ()
  const [menuItems, setMenuItems] = useState([{ label: '', key: '' }])
  const [flag, setFlag] = useState < Boolean > (true)
  const [currentRow, setCurrentRow] = useState <
    Partial < CODE_GENERATION.CodeTableListItem > | undefined
    > (undefined)

  useEffect(() => {
    tableOrigin()
    let arr = []
    databaseList().then((res) => {
      res.data.map((item) => {
        arr.push({ label: item.name, key: item.id })
      })
      setMenuItems(arr)
    })
  }, [])

  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      width: 20,
      hideInSearch: true,
    },
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
    },
    {
      title: '表名',
      dataIndex: 'tableName',
    },
    {
      title: '表备注',
      dataIndex: 'tableComment',
    },
  ]

  return (
    <ProCard split="vertical">
      <ProCard colSpan="15%">
        <Menu
          mode="inline"
          style={{ width: 200, fontSize: 17 }}
          items={menuItems}
          onSelect={async ({ _, key }) => {
            if (actionRef.current) {
              actionRef.current.clearSelected()
            }
            handleTablesData(key)
          }}
        />
      </ProCard>
      <ProCard colSpan="35%">
        <ProTable
          search={false}
          options={false}
          // request={(params, sorter, filter)=>{
          //   console.log(params, sorter, filter);
          //   return Promise.resolve({
          //     data: tableData,
          //     success: true,
          //   });
          // }}
          actionRef={actionRef}
          rowKey="tableName"
          pagination={{
            pageSize:10
          }}
          tableAlertRender={false}
          rowSelection={{
            type: 'checkbox',
            onChange: (_, selectedRows) => {
              setTableNames(selectedRows.map((item) => item.tableName))
            },
          }}
          rowClassName={(record) => {
            return record.tableName === currentRow?.tableName
              ? styles['split-row-select-active']
              : ''
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (flag) {
                  setCurrentRow(record)
                } else {
                  message.error('还有未保存的数据，请保存后再操作')
                }

              },
            }
          }}
          columns={columns}
          dataSource={tableData}
        />
      </ProCard>
      <ProCard>
        <TableItem
          setFlag={setFlag}
          tableNames={tableNames}
          tableData={tableData}
          rowTableName={currentRow?.tableName}
          setTableData={setTableData}
        />
      </ProCard>
    </ProCard>
  )
}

export default StepThree
