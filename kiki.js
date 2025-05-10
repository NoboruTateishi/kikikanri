import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MedicalDeviceManager() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "内視鏡",
      model: "NS-1000",
      location: "内視鏡室",
      lastInspection: "2025-04-01",
      nextInspection: "2025-10-01",
      repairs: [
        { date: "2024-12-15", description: "レンズ交換" },
        { date: "2025-03-10", description: "ケーブル断線修理" },
      ],
    },
    {
      id: 2,
      name: "MRI装置",
      model: "MR-750",
      location: "画像診断室",
      lastInspection: "2025-03-01",
      nextInspection: "2025-09-01",
      repairs: [
        { date: "2025-01-05", description: "ソフトウェア更新" },
      ],
    },
    {
      id: 3,
      name: "CTスキャナ",
      model: "CTX-300",
      location: "画像診断室",
      lastInspection: "2025-04-15",
      nextInspection: "2025-10-15",
      repairs: [],
    },
    {
      id: 4,
      name: "麻酔器",
      model: "AX-200",
      location: "手術室A",
      lastInspection: "2025-02-20",
      nextInspection: "2025-08-20",
      repairs: [
        { date: "2025-03-15", description: "流量計交換" },
      ],
    },
    {
      id: 5,
      name: "心電図モニター",
      model: "ECG-10",
      location: "ナースステーション",
      lastInspection: "2025-05-01",
      nextInspection: "2025-11-01",
      repairs: [],
    },
    {
      id: 6,
      name: "除細動器",
      model: "DF-50",
      location: "救急処置室",
      lastInspection: "2025-04-10",
      nextInspection: "2025-10-10",
      repairs: [
        { date: "2025-01-10", description: "バッテリー交換" },
      ],
    },
    {
      id: 7,
      name: "輸液ポンプ",
      model: "IP-300",
      location: "病棟A",
      lastInspection: "2025-03-25",
      nextInspection: "2025-09-25",
      repairs: [],
    },
    {
      id: 8,
      name: "電子カルテ端末",
      model: "PC-MED",
      location: "診察室1",
      lastInspection: "2025-01-10",
      nextInspection: "2025-07-10",
      repairs: [
        { date: "2025-02-20", description: "画面表示不良修正" },
      ],
    },
    {
      id: 9,
      name: "手術灯",
      model: "OP-LUX",
      location: "手術室B",
      lastInspection: "2025-04-20",
      nextInspection: "2025-10-20",
      repairs: [],
    },
    {
      id: 10,
      name: "血液分析装置",
      model: "HB-500",
      location: "検査室",
      lastInspection: "2025-03-30",
      nextInspection: "2025-09-30",
      repairs: [
        { date: "2025-04-05", description: "洗浄液漏れ修理" },
      ],
    },
  ]);

  const [newDevice, setNewDevice] = useState({ name: "", model: "", location: "" });
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [newRepair, setNewRepair] = useState({ date: "", description: "" });
  const [inspectionUpdate, setInspectionUpdate] = useState({ last: "", next: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const addDevice = () => {
    if (!newDevice.name || !newDevice.model) return;
    const newId = devices.length + 1;
    setDevices([
      ...devices,
      {
        id: newId,
        ...newDevice,
        lastInspection: "未実施",
        nextInspection: "未設定",
        repairs: [],
      },
    ]);
    setNewDevice({ name: "", model: "", location: "" });
  };

  const addRepair = (deviceId) => {
    if (!newRepair.date || !newRepair.description) return;
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              repairs: [...device.repairs, newRepair],
            }
          : device
      )
    );
    setNewRepair({ date: "", description: "" });
  };

  const updateInspection = (deviceId) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              lastInspection: inspectionUpdate.last,
              nextInspection: inspectionUpdate.next,
            }
          : device
      )
    );
    setInspectionUpdate({ last: "", next: "" });
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.name.includes(searchTerm) ||
      device.model.includes(searchTerm) ||
      device.location.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">医療機器管理システム</h1>

      <Tabs defaultValue="devices">
        <TabsList>
          <TabsTrigger value="devices">機器台帳</TabsTrigger>
          <TabsTrigger value="inspection">点検管理</TabsTrigger>
          <TabsTrigger value="repairs">修理履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">機器台帳一覧</h2>

            <div className="mb-4">
              <Input
                placeholder="機器名・型番・設置場所で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>機器名</TableHead>
                  <TableHead>型番</TableHead>
                  <TableHead>設置場所</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow key={device.id} onClick={() => setSelectedDevice(device)} className="cursor-pointer hover:bg-gray-100">
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.model}</TableCell>
                    <TableCell>{device.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">新しい機器を登録</h2>
            <div className="flex gap-2 flex-wrap">
              <Input placeholder="機器名" value={newDevice.name} onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })} />
              <Input placeholder="型番" value={newDevice.model} onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })} />
              <Input placeholder="設置場所" value={newDevice.location} onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })} />
              <Button onClick={addDevice}>登録</Button>
            </div>
          </div>

          {selectedDevice && (
            <div className="mt-8 border p-4 rounded-md shadow-md bg-white">
              <h2 className="text-xl font-bold mb-2">{selectedDevice.name} の詳細</h2>
              <p>型番: {selectedDevice.model}</p>
              <p>設置場所: {selectedDevice.location}</p>
              <p>前回点検日: {selectedDevice.lastInspection}</p>
              <p>次回点検日: {selectedDevice.nextInspection}</p>

              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">点検日を更新</h4>
                <Input placeholder="前回点検日 (YYYY-MM-DD)" value={inspectionUpdate.last} onChange={(e) => setInspectionUpdate({ ...inspectionUpdate, last: e.target.value })} />
                <Input placeholder="次回点検日 (YYYY-MM-DD)" value={inspectionUpdate.next} onChange={(e) => setInspectionUpdate({ ...inspectionUpdate, next: e.target.value })} />
                <Button onClick={() => updateInspection(selectedDevice.id)}>点検日を更新</Button>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">修理履歴</h3>
                {selectedDevice.repairs.length === 0 ? (
                  <p>修理履歴なし</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {selectedDevice.repairs.map((r, i) => (
                      <li key={i}>{r.date} - {r.description}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">修理を追加</h4>
                <Input placeholder="修理日 (YYYY-MM-DD)" value={newRepair.date} onChange={(e) => setNewRepair({ ...newRepair, date: e.target.value })} />
                <Input placeholder="修理内容" value={newRepair.description} onChange={(e) => setNewRepair({ ...newRepair, description: e.target.value })} />
                <Button onClick={() => addRepair(selectedDevice.id)}>修理追加</Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="inspection">
          <div className="space-y-4 mt-4">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardContent className="p-4">
                  <p className="font-semibold">{device.name}</p>
                  <p>前回点検日: {device.lastInspection}</p>
                  <p>次回点検予定: {device.nextInspection}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="repairs">
          <div className="space-y-4 mt-4">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardContent className="p-4">
                  <p className="font-semibold">{device.name}</p>
                  {device.repairs.length === 0 ? (
                    <p>修理履歴なし</p>
                  ) : (
                    <ul className="list-disc pl-5">
                      {device.repairs.map((r, i) => (
                        <li key={i}>{r.date} - {r.description}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
