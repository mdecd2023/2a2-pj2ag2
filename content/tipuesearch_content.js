var tipuesearch = {"pages": [{'title': 'About', 'text': '組長：41023119 呂承劼 \n 組員：41023114 王樟皓、41023126 卓桓琮、41023138 林敬燐 \n 倉儲 : \xa0 https://github.com/mdecd2023/2a2-pj1ag2 \n 網站 : \xa0 https://mdecd2023.github.io/2a2-pj1ag2/content/index.html \n https://mde.tw/pjcopsim \n', 'tags': '', 'url': 'About.html'}, {'title': 'pj1', 'text': '', 'tags': '', 'url': 'pj1.html'}, {'title': 'team10', 'text': 'editer: 41023119 呂承劼\xa041023138 林敬燐 \n 3/30 已完成場地及感測器 \n \n 4/14 完成記分板程式 \n \n 4/14 可進行計分 \n 觸碰到感測器球及機器人會重置到原本的位置 \n \n 在錄影時記分板不會顯示出來-附上圖片 \n \n 當分數為5分時，會暫停模擬 \n \n 在製作感測器時求記得把 collidable、measurable、detectable 這三個選項打開 \n \n 另外要注意的是感測器 z軸的部分不能為0，否則感測器會直接偵測到地板導致程式暫停模擬 \n 記分板程式註解 \n function sysCall_init()\n    score1 = 0 -- 初始化一個名為score1的變數，值為0\n    \n    sensor = sim.getObject(\'./sensor\') -- 從模擬場景中獲取一個名為sensor的物體\n    \n    -- 創建一個UI，包括標題、計分標籤和當前分數值標籤，使用plastique風格\n    xml = [[\n        <ui title="Scoreboard" closeable="false" resizable="false" style="plastique">\n        <label text="Score:" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="10"/>\n        <label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="30"/>\n     \n        </ui>\n    ]]\n    ui = simUI.create(xml) -- 創建UI\n    simUI.setPosition(ui, 0,0, true) -- 將UI定位在屏幕左上角\n    bubbleRob = sim.getObject(\'/bubbleRob\') -- 從模擬場景中獲取名為bubbleRob的物體句柄\n    ball = sim.getObject(\'/ball\') -- 從模擬場景中獲取名為ball的物體句柄\n    bubbleRob2 = sim.getObject(\'/bubbleRob2\') -- 從模擬場景中獲取名為bubbleRob2的物體句柄\n    initialPosition = sim.getObjectPosition(bubbleRob, -1) -- 獲取bubbleRob物體的初始位置\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1) -- 獲取bubbleRob物體的初始方向\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1) -- 獲取bubbleRob2物體的初始位置\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1) -- 獲取bubbleRob2物體的初始方向\n    initialballPosition = sim.getObjectPosition(ball, -1) -- 獲取ball物體的初始位置\n    initialballOrientation = sim.getObjectOrientation(ball, -1) -- 獲取ball物體的初始方向\n\nend\n\nfunction sysCall_actuation()\n    --simUI.setLabelText(ui, 30, tostring(sim.getFloatSignal("myVariable")))\n\n    -- 讀取接近傳感器的距離值，將其存儲在result變數中\n    result=sim.readProximitySensor(sensor)\n\n    -- 如果分數小於5，則執行以下操作\n    if(score1<5)then\n\n        -- 如果檢測到接近物體，則執行以下操作\n        if(result>0)then\n            -- 將score1變數增加1\n            score2 = score1+1\n\n            -- 在UI中更新分數值標籤的文本為score2\n            simUI.setLabelText(ui, 30, tostring(score2))\n\n            -- 重置bubbleRob、bubbleRob2和ball物體的位置和方向\n            sim.setObjectPosition(bubbleRob, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob, -1, initialOrientation)\n            sim.setObjectPosition(bubbleRob2, -1, initialPosition2)\n            sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n\n            -- 將score1設置為score2\n            score1=score2\n        end\n    else\n        -- 如果分數達到5，則暫停模擬\n        sim.pauseSimulation()\n    end\nend \n 倒數計時器程式註解 \n -- 初始化函數，初始化得分(score1)為0和計時器(count)為3600\nfunction sysCall_init()\n    -- initialize the score to 0\n    score1 = 0 -- 初始化得分\n    count = 3600 -- 初始化計時器\n    -- 獲取接近傳感器對象並創建UI界面\n    sensor = sim.getObject(\'./sensor\')\n    xml = [[\n            <ui title="Scoreboard" closeable="false" resizable="false" style="plastique">\n              <label text="60:00.0" style="* {background-color: #F00; color: #FFF; font-size: 32px; font-weight: bold; padding: 4px; border-radius: 4px;}" id="10"/>\n              <label text="Score:" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="20"/>\n              <label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="30"/>\n            </ui>\n          ]]\n    ui = simUI.create(xml)\n    simUI.setPosition(ui, 0, 0, true)\n    -- 獲取對象及其初始位置/方向\n    bubbleRob = sim.getObject(\'/bubbleRob\')\n    ball = sim.getObject(\'/ball\')\n    initialPosition = sim.getObjectPosition(bubbleRob, -1)\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)\n    initialballPosition = sim.getObjectPosition(ball, -1)\n    initialballOrientation = sim.getObjectOrientation(ball, -1)\n    \nend\n\nfunction sysCall_actuation() -- 讀取接近傳感器值\n    result=sim.readProximitySensor(sensor)\n    -- 檢查得分是否小於5\n    if(score1<5)then\n        -- 檢查接近傳感器是否檢測到某物\n        if(result>0)then\n            -- 增加得分並更新UI標籤\n            score2 = score1+1\n            simUI.setLabelText(ui, 30, tostring(score2))\n            -- 重置對象的位置和方向\n            sim.setObjectPosition(bubbleRob, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob, -1, initialOrientation)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n            -- 更新得分變量\n            score1=score2\n        end\n    end\n    if count > 0 then -- 檢查計時器是否大於0\n          count = count - 1 -- 減少倒數時間\n          local minutes = math.floor(count / 60) -- 計算分鐘\n          local seconds = count % 60 -- 計算秒數\n          local timeStr = string.format("%d:%02d", minutes , seconds) -- 格式化時間字符串\n          simUI.setLabelText(ui, 10, timeStr) -- 更新時間UI標籤\n          simUI.setLabelText(ui, 30, tostring(score1)) -- 更新score的UI標籤\n    else\n        -- 如果時間到會暫停模擬\n        sim.pauseSimulation()\n    end\nend \n 可以將倒數計時器顯示出來，但計時器所減少的時間會比正常時間快好幾倍 \n \n bubbleRob_football 檔案 :  bubbleRob_football_pj1ag10 \n 加入連線對戰 bubbleRob_football 檔案 :  bubbleRob_football-2_pj1ag10 \n \n 連線remoteAPI程式註解 \n # 引入必要的模块\nfrom zmqRemoteApi import RemoteAPIClient\nimport keyboard\nimport sim\nimport time\nimport simConst\n\n# 打印程式啟動的訊息\nprint(\'Program started\')\n\n# 關閉所有已開啟的連線\nsim.simxFinish(-1)\n\n# 連接到遠端 API 伺服器\nclientID = sim.simxStart(\'192.168.56.1\', 19998, True, True, 5000, 5)\n\n# 啟動仿真\nsim.simxStartSimulation(clientID, sim.simx_opmode_oneshot_wait)\n\n# 判斷是否成功連線到伺服器\nif clientID != -1:\n    print(\'Connected to remote API server\')\nelse:\n    print(\'Failed connecting to remote API server\')\n\n# 打印仿真開始的訊息\nprint(\'Simulation started\')\n\n# 取得左右輪子的控制句柄\nerrorCode, leftMotor = sim.simxGetObjectHandle(clientID, \'leftMotor2\', sim.simx_opmode_oneshot_wait)\nerrorCode, rightMotor = sim.simxGetObjectHandle(clientID, \'rightMotor2\', sim.simx_opmode_oneshot_wait)\n\n# 設定 BubbleRob 的速度\ndef setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):\n    # 取得左右輪子的控制句柄\n    errorCode, leftMotor = sim.simxGetObjectHandle(clientID, \'/leftMotor2\', sim.simx_opmode_oneshot_wait)\n    errorCode, rightMotor = sim.simxGetObjectHandle(clientID, \'/rightMotor2\',sim.simx_opmode_oneshot_wait)\n    # 設定左右輪子的目標速度\n    sim.simxSetJointTargetVelocity(clientID, leftMotor, leftWheelVelocity, simConst.simx_opmode_streaming)\n    sim.simxSetJointTargetVelocity(clientID, rightMotor, rightWheelVelocity, simConst.simx_opmode_streaming)\n\n# 循環檢測鍵盤事件\nwhile True:\n    if keyboard.is_pressed(\'up\'):\n        # 按下"上"鍵，前進\n        setBubbleRobVelocity(2.0, 2.0)\n    elif keyboard.is_pressed(\'down\'):\n        # 按下"下"鍵，後退\n        setBubbleRobVelocity(-2.0, -2.0)\n    elif keyboard.is_pressed(\'left\'):\n        # 按下"左"鍵，左轉\n        setBubbleRobVelocity(-2.0, 2.0)\n    elif keyboard.is_pressed(\'right\'):\n        # 按下"右"鍵，右轉\n        setBubbleRobVelocity(2.0, -2.0)\n    elif keyboard.is_pressed(\'q\'):\n        # 按下"q"鍵，停止仿真\n        sim.stopSimulation()\n    else:\n        # 沒有按下任何鍵，停止移動\n        setBubbleRobVelocity(0.0, 0.0) \n 此程式必須放在圖片紅色框框檔案中 \n \n 啟動遠端API程式註解 \n -- The main script is not supposed to be modified, except in special cases.\nrequire(\'defaultMainScript\')\nfunction sysCall_init()\nsimRemoteApi.start(19998) -- 啟動遠程 API，監聽端口號為 19998\nend \n 連線 API sensor 程式註解 \n --在這個函數中初始化變數，設置UI元素，並獲取物體的初始位置和方向\nfunction sysCall_init()\nscore1 = 0 --初始化分數變量\ncount = 24000 --初始化計時器變量，代表比賽時間，這裡設置為24000，即400秒\nsensor = sim.getObject(\'./sensor\') --獲取名為"sensor"的接近傳感器\n--創建UI元素，顯示分數和計時器\nxml2 = [[\n<ui title="計分板" closeable="false" resizable="false" style="plastique">\n<label text="分數：" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="20"/>\n<label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="30"/>\n</ui>\n]]\nui = simUI.create(xml2) --創建計分板UI\nsimUI.setPosition(ui, 0,0, true) --設置UI位置\nxml3 = [[\n<ui title="計時器" closeable="false" resizable="false" style="plastique">\n<label text="400:00.0" style="* {background-color: #F00; color: #FFF; font-size: 32px; font-weight: bold; padding: 4px; border-radius: 4px;}" id="10"/>\n</ui>\n]]\nui2 = simUI.create(xml3) --創建計時器UI\nsimUI.setPosition(ui2, 900,0, true) --設置UI位置\n--獲取機器人和球的句柄，以及它們的初始位置和方向\nbubbleRob = sim.getObject(\'/bubbleRob\')\nball = sim.getObject(\'/ball\')\nbubbleRob2 = sim.getObject(\'/bubbleRob2\')\ninitialPosition = sim.getObjectPosition(bubbleRob, -1)\ninitialOrientation = sim.getObjectOrientation(bubbleRob, -1)\ninitialPosition2 = sim.getObjectPosition(bubbleRob2, -1)\ninitialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)\ninitialballPosition = sim.getObjectPosition(ball, -1)\ninitialballOrientation = sim.getObjectOrientation(ball, -1)\nend\n\n--在這個函數中實現比賽計時和計分邏輯\nfunction sysCall_actuation() -- 讀取接近傳感器值\n    result=sim.readProximitySensor(sensor)\n    -- 檢查得分是否小於5\n    if(score1<5)then\n        -- 檢查接近傳感器是否檢測到某物\n        if(result>0)then\n            -- 增加得分並更新UI標籤\n            score2 = score1+1\n            simUI.setLabelText(ui, 30, tostring(score2))\n            -- 重置對象的位置和方向\n            sim.setObjectPosition(bubbleRob, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob, -1, initialOrientation)\n            sim.setObjectPosition(bubbleRob2, -1, initialPosition2)\n            sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n            -- 更新得分變量\n            score1=score2\n        end\n    end\n    if count > 0 then -- 檢查計時器是否大於0\n          count = count - 1 -- 減少倒數時間\n          local minutes = math.floor(count / 60) -- 計算分鐘\n          local seconds = count % 60 -- 計算秒數\n          local timeStr = string.format("%d:%02d", minutes , seconds) -- 格式化時間字符串\n          simUI.setLabelText(ui, 10, timeStr) -- 更新時間UI標籤\n          simUI.setLabelText(ui, 30, tostring(score1)) -- 更新score的UI標籤\n    else\n        -- 如果時間到會暫停模擬\n        sim.pauseSimulation()\n    end\nend \n 連線 API sensor2 程式註解 \n function sysCall_init()\n        score1 = 0 -- 初始分數為 0\n        sensor = sim.getObject(\'./sensor2\')  -- 取得感測器物件\n        xml = [[\n             <ui title="Scoreboard" closeable="false" resizable="false" style="plastique">\n             <label text="Score:" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="40"/>\n             <label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="50"/>\n              </ui>\n        ]]  -- 創建 UI 界面\n        ui = simUI.create(xml)  -- 顯示 UI 界面\n        simUI.setPosition(ui, 1770,0, true)  -- 設定 UI 界面的位置\n        bubbleRob = sim.getObject(\'/bubbleRob\')  -- 取得 BubbleRob 物件\n        ball = sim.getObject(\'/ball\')  -- 取得球物件\n        bubbleRob2 = sim.getObject(\'/bubbleRob2\')  -- 取得第二個 BubbleRob 物件\n        initialPosition = sim.getObjectPosition(bubbleRob, -1)  -- 取得 BubbleRob 初始位置\n        initialOrientation = sim.getObjectOrientation(bubbleRob, -1)  -- 取得 BubbleRob 初始方向\n        initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)  -- 取得第二個 BubbleRob 初始位置\n        initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)  -- 取得第二個 BubbleRob 初始方向\n        initialballPosition = sim.getObjectPosition(ball, -1)  -- 取得球的初始位置\n        initialballOrientation = sim.getObjectOrientation(ball, -1)  -- 取得球的初始方向\nend\n\nfunction sysCall_actuation()\n     --simUI.setLabelText(ui, 30, tostring(sim.getFloatSignal("myVariable")))\n     result=sim.readProximitySensor(sensor) -- 讀取感測器的值\n     if(score1<5)then -- 如果分數小於 5 分\n       if(result>0)then -- 如果感測器的值大於 0\n        score2 = score1+1 -- 分數加 1\n        simUI.setLabelText(ui, 50, tostring(score2)) -- 更新分數顯示\n        sim.setObjectPosition(bubbleRob, -1, initialPosition)  -- 將 BubbleRob 重置到初始位置\n        sim.setObjectOrientation(bubbleRob, -1, initialOrientation)  -- 將 BubbleRob 重置到初始方向\n        sim.setObjectPosition(bubbleRob2, -1, initialPosition2)  -- 將第二個 BubbleRob 重置到初始位置\n        sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)  -- 將第二個 BubbleRob 重置到初始方向\n        sim.setObjectPosition(ball, -1, initialballPosition)  -- 將 Ball 重置到初始位置\n        sim.setObjectOrientation(ball, -1, initialballOrientation)  -- 將 Ball 重置到初始方向\n        -- 將score1設置為score2\n        score1=score2\n        end\n    else\n        -- 如果分數達到5，則暫停模擬\n        sim.pauseSimulation()\n    end\nend \n \n 所有檔案壓縮檔： bubbleRob football 2a-pj1ag10.7z \n', 'tags': '', 'url': 'team10.html'}, {'title': 'team12', 'text': 'eidter: 41023114 王樟皓、41023126 卓桓琮 \n Process\xa0 \n Step1 :建立足球場景，透過onshape繪出足球的場景，足球分成兩部分第一部分為足球的牆壁第二部分為球門。足球的牆壁: wall \xa0球門: door \n Step2 :轉成STL檔匯入coppaliasim場景中，放入先前製作的bobbleRob robot，並複製兩個在場景中，加入球體 過程: https://youtu.be/Rc-BSnYI17w \n \n Step3 :設定coppliasim中的參數 \n 1.在兩個球門上加入感應sensor，以感測是否進球，將兩個seonsor拉到球門底下 \n \n 2.設定ball的參數 \n \n \n \n  接下來將 mp4 檔案從 downloads 目錄取出  \n \n \n 3.bubbleRob robot 參數設定: bubbleRob \n Step4 :加入sensor程式碼-利用chatgpt 寫出程式碼-計時器(記分板-參考至ag2) \n 文字檔: sensor-program \n \n \n function sysCall_init()\n    score1 = 0\n    remaining_time = 60 -- 1 minute\n    sensor = sim.getObject(\'./sensor\')\n    xml = [[                                                             ]]\n    ui = simUI.create(xml)\n    simUI.setPosition(ui, 0,0, true)\n    bubbleRob1 = sim.getObject(\'/bubbleRob1\')\n    ball = sim.getObject(\'/ball\')\n    bubbleRob2 = sim.getObject(\'/bubbleRob2\')\n    initialPosition = sim.getObjectPosition(bubbleRob1, -1)\n    initialOrientation = sim.getObjectOrientation(bubbleRob1, -1)\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)\n    initialballPosition = sim.getObjectPosition(ball, -1)\n    initialballOrientation = sim.getObjectOrientation(ball, -1)\nend\n\nfunction sysCall_actuation()\n    -- read the proximity sensor value\n    result=sim.readProximitySensor(sensor)\n    -- check if the remaining time is greater than 0\n    if(remaining_time > 0) then\n        -- check if the proximity sensor detects something\n        if(result>0) then\n            -- increase the score and update the UI label\n            score2 = score1+1\n            simUI.setLabelText(ui, 30, tostring(score2))\n            -- reset the objects\' positions and orientations\n            sim.setObjectPosition(bubbleRob1, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob1, -1, initialOrientation)\n            sim.setObjectPosition(bubbleRob2, -1, initialPosition2)\n            sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n            -- update the score variable\n            score1=score2\n        end\n        -- update the remaining time and the UI label\n        remaining_time = remaining_time - sim.getSimulationTimeStep()\n        simUI.setLabelText(ui, 40, "Time left: "..math.floor(remaining_time).."s")\n    else\n        sim.stopSimulation()\n    end\nend \n 第二版 sersor 程式碼  \n 文字檔: sensor-program2 \n function sysCall_init()\n    score1 = 0\n    remaining_time = 1200 -- 20 minute\n    sensor = sim.getObject(\'./sensor1\')\n    xml = [[                                                             ]]\n    ui = simUI.create(xml)\n    simUI.setPosition(ui, 0,0, true)\n    bubbleRob1 = sim.getObject(\'/bubbleRob1\')\n    ball = sim.getObject(\'/ball\')\n    bubbleRob2 = sim.getObject(\'/bubbleRob2\')\n    initialPosition = sim.getObjectPosition(bubbleRob1, -1)\n    initialOrientation = sim.getObjectOrientation(bubbleRob1, -1)\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)\n    initialballPosition = sim.getObjectPosition(ball, -1)\n    initialballOrientation = sim.getObjectOrientation(ball, -1)\nend\n\nfunction sysCall_actuation()\n    -- read the proximity sensor value\n    result=sim.readProximitySensor(sensor)\n    -- check if the remaining time is greater than 0\n    if(remaining_time > 0) then\n        -- check if the proximity sensor detects something\n        if(result>0) then\n            -- increase the score and update the UI label\n            score2 = score1+1\n            simUI.setLabelText(ui, 30, tostring(score2))\n            -- reset the objects\' positions and orientations\n            sim.setObjectPosition(bubbleRob1, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob1, -1, initialOrientation)\n            sim.setObjectPosition(bubbleRob2, -1, initialPosition2)\n            sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n            -- update the score variable\n            score1=score2\n        end\n        -- update the remaining time and the UI label\n        remaining_time = remaining_time - sim.getSimulationTimeStep()\n        simUI.setLabelText(ui, 40, "Time left: "..math.floor(remaining_time).."s")\n    else\n        sim.stopSimulation()\n    end\nend \n \n Step5 :打開小白窗 加入程式碼 按go \n 文字檔: whitewindow \n # pip install pyzmq cbor\nfrom zmqRemoteApi import RemoteAPIClient\nimport keyboard\n\nclient = RemoteAPIClient(\'localhost\', 23000)\n\nprint(\'Program started\')\nsim = client.getObject(\'sim\')\nsim.startSimulation()\nprint(\'Simulation started\')\n\ndef setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):\n    leftMotor = sim.getObject(\'/leftMotor\')\n    rightMotor = sim.getObject(\'/rightMotor\')\n    sim.setJointTargetVelocity(leftMotor, leftWheelVelocity)\n    sim.setJointTargetVelocity(rightMotor, rightWheelVelocity)\n\n\'\'\'\n# Example usage 1:\nsetBubbleRobVelocity(1.0, 1.0)\ntime.sleep(2)\nsetBubbleRobVelocity(0.0, 0.0)\n\'\'\'\n# use keyborad to move BubbleRob\n\nwhile True:\n    if keyboard.is_pressed(\'up\'):\n        setBubbleRobVelocity(1.0, 1.0)\n    elif keyboard.is_pressed(\'down\'):\n        setBubbleRobVelocity(-1.0, -1.0)\n    elif keyboard.is_pressed(\'left\'):\n        setBubbleRobVelocity(-1.0, 1.0)\n    elif keyboard.is_pressed(\'right\'):\n        setBubbleRobVelocity(1.0, -1.0)\n    elif keyboard.is_pressed(\'q\'):\n        # stop simulation\n        sim.stopSimulation()\n    else:\n        setBubbleRobVelocity(0.0, 0.0) \n 在football的場景加入計時器和記分板 過程: https://youtu.be/EZ_mE9P4j-s \n 第一版 \n \n \n \n \n \n \n \n 第二版 \n \n \n \n \n \n \n \n \n Step6 :連線對戰 \n 1.查詢ipconfig 找到ipv4埠號\xa0 \n \n 2.將自己ipv4埠號複製到小白窗的程式中 \n \n \n 3.開始兩人對戰 \n \n \n Final:連線對打未完成 都有設定 防火牆也有關 但是對方就連不到 \n 連線失敗過程: \n \n \n football.ttt檔: pj1-football \n', 'tags': '', 'url': 'team12.html'}, {'title': 'pj2', 'text': "4人操控 bubbleRob 利用 remote API server 錄製的影片 \n \n remote API 程式 \n # pip install pyzmq cbor\nfrom zmqRemoteApi import RemoteAPIClient\nimport keyboard\nimport sim\nimport time\nimport simConst\n\nprint('Program started')\nsim.simxFinish(-1) # just in case, close all openㄋed connections\nclientID=sim.simxStart('192.168.1.35',19997,True,True,5000,5)\nsim.simxStartSimulation(clientID, sim.simx_opmode_oneshot_wait)\n\nif clientID!=-1:\n    print('Connected to remote API server')\nelse:\n    print('Failed connecting to remote API server')\n\nprint('Simulation started')\n\nerrorCode, leftMotor = sim.simxGetObjectHandle(clientID, 'leftMotor', sim.simx_opmode_oneshot_wait)\nerrorCode, rightMotor = sim.simxGetObjectHandle(clientID, 'rightMotor', sim.simx_opmode_oneshot_wait)\n\ndef setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):\n    errorCode, leftMotor = sim.simxGetObjectHandle(clientID, '/leftMotor', sim.simx_opmode_oneshot_wait)\n    errorCode, rightMotor = sim.simxGetObjectHandle(clientID, '/rightMotor',sim.simx_opmode_oneshot_wait)\n    sim.simxSetJointTargetVelocity(clientID, leftMotor, leftWheelVelocity, simConst.simx_opmode_streaming)\n    sim.simxSetJointTargetVelocity(clientID, rightMotor, rightWheelVelocity, simConst.simx_opmode_streaming)\n\n'''\n# Example usage 1:\nsetBubbleRobVelocity(1.0, 1.0)\ntime.sleep(2)\nsetBubbleRobVelocity(0.0, 0.0)\n'''\n# use keyborad to move BubbleRob\n\nwhile True:\n    if keyboard.is_pressed('w'):\n        setBubbleRobVelocity(2.0, 2.0)\n    elif keyboard.is_pressed('s'):\n        setBubbleRobVelocity(-2.0, -2.0)\n    elif keyboard.is_pressed('a'):\n        setBubbleRobVelocity(-2.0, 2.0)\n    elif keyboard.is_pressed('d'):\n        setBubbleRobVelocity(2.0, -2.0)\n    elif keyboard.is_pressed('q'):\n        # stop simulation\n        sim.stopSimulation()\n    else:\n        setBubbleRobVelocity(0.0, 0.0) \n \n 控制 remote API 檔案： bubbleRob_zmq_green_red_example.7z \n 遇到問題：一開始本組是利用三台教室電腦及一台筆電，開始模擬時唯獨筆電無法操控 bubbleRob，後來發現網路必需都要連至同一個 Wi-Fi 才能 zmqRemoteAPI 的操控。", 'tags': '', 'url': 'pj2.html'}, {'title': 'w10', 'text': "\n \n 有關 CoppeliaSim zmqRemoteAPI 問題 \n \n \n \n What is zmqRemoteAPI, and how does it relate to CoppeliaSim? \n How do you establish a connection between a Python script and CoppeliaSim using zmqRemoteAPI? \n What are some common use cases for zmqRemoteAPI in CoppeliaSim? \n What are the advantages and disadvantages of using zmqRemoteAPI compared to other methods of communication between Python and CoppeliaSim? \n Can you give an example of a project or task that you could complete using zmqRemoteAPI in CoppeliaSim? \n \n \n answer: \n \n 41023114>1 \n zmqRemoteAPI   是   CoppeliaSim   提供的一個用於遠端控制仿真場景的工具。它基於   ZeroMQ   庫實現，可以在   Python、MATLAB、C++、Java、Octave   等多種編程語言中使用。使用   zmqRemoteAPI，可以通過編程控制   CoppeliaSim   中的機器人、傳感器、物體等各種元件，實現自動化控制、遠端操作、仿真驗證等功能。 因此，zmqRemoteAPI   是   CoppeliaSim   中的一個重要功能，使得使用者可以通過編程方式控制和操作仿真場景中的各種元件，進而實現更加靈活和高效的仿真操作。   \n \n 41023119>2 \n 1.在   Python   程式中，使用相應的   Python   模組（例如   PyZMQ）引入   zmqRemoteAPI。  \n 2.在   CoppeliaSim   模擬環境中，添加一個   Remote   API   Server   對象，並設定相應的通訊端口。 在   Python   程式中，使用   zmqRemoteAPI   提供的函式（例如   simxStart、simxFinish、simxGetConnectionId   等）建立與   CoppeliaSim   的連接，並設定適當的連接參數。  \n 3.通過   zmqRemoteAPI   提供的函式（例如   simxCallScriptFunction、simxGetObjectHandle   等）向   CoppeliaSim   發送指令或獲取資料。  \n 4.在   Python   程式中，使用   zmqRemoteAPI   提供的函式（例如   simxFinish）關閉與   CoppeliaSim   的連接。 簡而言之，使用   zmqRemoteAPI   在   Python   和   CoppeliaSim   之間建立連接需要在   Python   程式中引入相應的模組、設定   CoppeliaSim   的   Remote   API   Server、使用相應的函式建立連接、進行通訊和控制，並在連接結束時關閉連接。 \n \n 41023126>3 \n zmqRemoteAPI   在   CoppeliaSim   中的一些常見使用案例：  \n 控制機器人：使用   zmqRemoteAPI   可以通過   Python   程式控制   CoppeliaSim   中的機器人模型，例如移動機器人、控制關節運動、設定感測器等。 \n  场景设置：使用   zmqRemoteAPI   可以自動化設置   CoppeliaSim   中的場景，例如添加物體、設定物體的位置和屬性、設置環境條件等。  \n 效能測試：使用   zmqRemoteAPI   可以進行性能測試和評估，例如測試控制算法的運行速度、記憶體使用等。  \n 資料收集：使用   zmqRemoteAPI   可以從   CoppeliaSim   中獲取模擬環境中的資料，例如感測器數值、物體位置、碰撞狀態等，並用於後續的資料分析和處理。  \n 教育和研究：使用   zmqRemoteAPI   可以在教育和研究領域中進行虛擬實驗、模擬場景等，幫助學生和研究人員學習和研究機器人相關的知識和技能。  \n 簡而言之，zmqRemoteAPI   在   CoppeliaSim   中常見的使用案例包括機器人控制、場景設置、效能測試、資料收集和教育研究等領域。 \n \n 41023138>4 \n 優點：  \n 跨平台：zmqRemoteAPI基於ZeroMQ庫實現，支持跨平台通信，因此可以輕鬆地在Windows、Mac和Linux等操作系統上使用。  \n 高效性：zmqRemoteAPI的通信速度非常快，比其他通信方法如socket和pipe等更加高效，這對於需要快速傳輸大量數據的應用場景非常有利。  \n 易於使用：使用zmqRemoteAPI進行通信非常簡單，只需要在Python腳本中導入相關庫，創建一個ZeroMQ套接字並與CoppeliaSim建立連接即可。 設置靈活：zmqRemoteAPI的設置非常靈活，可以根據需要對其進行自定義設置，例如可以設置超時時間、心跳機制等。  \n 缺點：  \n 依賴庫較多：使用zmqRemoteAPI需要安裝和導入多個庫，包括zmq庫和zmqRemoteAPI庫，這增加了開發和維護的複雜度。  \n 需要CoppeliaSim的支持：zmqRemoteAPI需要CoppeliaSim進行支持，因此需要在CoppeliaSim的腳本中進行相應的設置。  \n 總的來說，使用zmqRemoteAPI作為Python和CoppeliaSim之間通信的方法具有許多優點，但也存在一些缺點。開發者可以根據具體應用場景選擇最適合的通信方式。 \n \n 41023114>5 \n 以下是一個使用   CoppeliaSim   的   zmqRemoteAPI   控制機械臂自動抓取物體的   Python   程序  \n \n import sim import time # 定義物體的名稱和位置\nobject_name = 'Cuboid' object_position = [-0.2, 0.5, 0.1] # 連接 CoppeliaSim sim.simxFinish(-1) clientID = sim.simxStart('127.0.0.1', 19999, True, True, 5000, 5) \nif clientID != -1: print('Connected to remote API server') # 取得機械臂控制句柄\nerrorCode, robot_handle = sim.simxGetObjectHandle(clientID, 'UR3', sim.simx_opmode_blocking) # 取得物體控制句柄\nerrorCode, object_handle = sim.simxGetObjectHandle(clientID, object_name, sim.simx_opmode_blocking) # 移動機械臂到指定位置\ntarget_position = [-0.2, 0.5, 0.2] sim.simxSetObjectPosition(clientID, robot_handle, -1, target_position, sim.simx_opmode_blocking) # 機械臂夾取物體 sim.simxSetObjectParent(clientID, object_handle, robot_handle, True, sim.simx_opmode_blocking) # 移動機械臂到指定位置\nsim.simxSetObjectPosition(clientID, robot_handle, -1, object_position, sim.simx_opmode_blocking) # 釋放夾爪\nsim.simxSetObjectParent(clientID, object_handle, -1, True, sim.simx_opmode_blocking) # 移動機械臂到指定位置\nsim.simxSetObjectPosition(clientID, robot_handle, -1, target_position, sim.simx_opmode_blocking) # 斷開與 CoppeliaSim 的連接\nsim.simxFinish(clientID) else: print('Failed connecting to remote API server') time.sleep(1) \n \n  這個   Python   程序通過   CoppeliaSim   的   zmqRemoteAPI   連接到   CoppeliaSim   仿真環境，控制機械臂移動到指定位置，夾取物體並將其移動到另一個位置，最後釋放夾爪。這個程序可以應用於機械臂自動化抓取和放置物體的項目或任務。   \n \n meeting \n \n \n \n \n \n \n", 'tags': '', 'url': 'w10.html'}, {'title': 'note', 'text': '課程筆記 \n', 'tags': '', 'url': 'note.html'}, {'title': 'stud2.cycu.org', 'text': 'step 1：Login to https://mail.nfu.edu.tw - 查看登入 stud2.cycu.org 伺服器的密碼, 帳號為 cd+學號, 密碼為四個字元, 包括數字與小寫英文字母，並查詢 stud.cycu.org 中與帳號對應的近端 (給 127.0.0.1 使用, 9 開頭的 port) 與遠端 (給 stud.cycu.org, 8 開頭的 port) 埠號  step 2：修改可攜 Python 3.10.6 start.bat, 蓋掉第三行後重新啟動, 目的希望將操作系統的命令搜尋路徑放在可攜目錄搜尋路徑之後.  step 3：重新啟動可攜程式環境, 在其中一個命令列, ssh\xa0 cd+學號@stud2.cycu.org, 表示要使用 secure shell 遠端登入到 stud2.cycu.org, 這是一台 Linux 主機, 安裝 Ubuntu 22.04 Server.(若使用的網路連線協定並無 IPv6,\xa0 可將系統的 proxy 設為 140.130.17.4:3128 kmolab/kmolab)  step 4：在 ssh 登入畫面, 以 ssh-keygen 建立 key pairs, .ssh/id_rsa 為 private key, id_rsa.pub 為 public key  step 5：設法利用 Filezilla, 以 sftp 安全的(Secure)檔案(File)傳輸(Transmission)協定(Protocol), 與 stud.cycu.org 伺服器連結.  step 6：利用\xa0 Filezilla sftp 取下 id_rsa.pub, 登錄至 Github 帳號下的 Setting - >\xa0 SSH and GPG keys.  step 7：對 server sftp 也可以利用\xa0 Filezilla portable, 以圖形介面完成. 而 ssh 也可以透過\xa0 putty.exe 執行遠端登入.  step 8：接下來要下載\xa0 config 設定檔案,\xa0 以 sftp 放入 stud2.cycu.org 主機的 .ssh 目錄中.  step 9：接下來要在\xa0 Ubuntu (也就是 stud.cycu.org 這台主機所安裝的操作系統) 中, 設定 .gitconfig, 總共包含三項設定: git config --global user.name "scrum-1", git config --global user.email\xa0 "scrum1@mde.tw"\xa0\xa0 以及 git config --global http.proxy http://p42.cycu.org:3128, 這三個設定必須在 ssh 登入畫面中執行, 設定完成檔案會存入帳號根目錄中的 .gitconfig \xa0 step 10：接著下載 server.py, 在 Windows 編輯 server.py, 將個人分配到的 9xxxx 埠號填入後存檔, 以 sftp 放入上列取下的倉儲根目錄.  會使用的指令： pwd 代表 print working directory, clear - 清除螢幕 cd - 更換目錄 ls -l - 列出目錄詳細內容 chmod u+x acp - 表示讓 user 可以 execute acp script (能夠讓使用者以 source acp 加上提交字串進行 git add, git commit, git push, 如何在 Windows 執行 acp.bat 加上提交字串.  ps axo pid,comm,user | grep "python3" - 表示要找出使用 python3 執行的 process, 列出其 process id, command 以及 user kill -9 - 移除 python3 執行的 process id \n', 'tags': '', 'url': 'stud2.cycu.org.html'}, {'title': 'Brython', 'text': '>>>>>>> 103de1e4aaa89a1c0c2d078475e4bc6bb4f3dc3a \n https://en.wikipedia.org/wiki/Python_(programming_language) \n Examples: \n https://gist.github.com/mdecycu/d9082d678096bd58378d6afe2c7fa05d \n https://www.geeksforgeeks.org/python-programming-examples/ \n https://www.programiz.com/python-programming/examples \n https://www.freecodecamp.org/news/python-code-examples-sample-script-coding-tutorial-for-beginners/ \n Python Tutorial: \n https://docs.python.org/3/tutorial/ \n An informal introduction to Python \n Indentation (Python 採 4 個 Spaces 縮排, 以界定執行範圍) \n Variables ( Python Keywords ) \n Comments (# 單行註解, 三個單引號或三個雙引號標註多行註解) \n Numbers  (整數 int(), 浮點數 float()) \n Strings  (字串) \n print (Python 內建函式,  print()  函式) \n Python control flow tools \n for \n if \n range \n open \n read \n lists \n tuples \n dictionaries \n functions \n try ... except \n break \n pass \n classes \n 這個頁面 demo 如何在同一頁面下納入多個線上 Ace 編輯器與執行按鈕 ( practice_html.txt  動態頁面超文件). \n practice_html.txt  動態頁面超文件應該可以在啟動 Brython 時, 設定將 .py 檔案放入 downloads/py 目錄中引用. \n 亦即將所有對應的 html 也使用 Brython 產生, 然後寫為  class  後, 在範例導入時透過  instance  引用. \n <!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n</script> \n 從 1 累加到 100: \n 1 add to 100 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束  \n \n  ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris Rotating Block \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束  \n \n \n \n \n', 'tags': '', 'url': 'Brython.html'}, {'title': 'Brython_ex2', 'text': 'This code uses the Euler method to approximate the solution to the ODE dy/dx = x - y with an initial condition of y0 = 1.0. The solution is calculated for a range of x values from 0 to 5. \n \n \n \n \n \n \n Solve ODE: \n from browser import document\n\ndef dy_dx(y, x):\n    return x - y\n\nx_start = 0\nx_end = 5\nn_points = 100\nx = [x_start + i * (x_end - x_start) / (n_points - 1) for i in range(n_points)]\ny0 = 1.0\nh = x[1] - x[0]\ny = [y0]\nfor i in range(1, len(x)):\n    y.append(y[-1] + h * dy_dx(y[-1], x[i-1]))\n\n# Create a new paragraph element and set its text content to the solution\np = document.createElement(\'p\')\np.textContent = f"The solution to the ODE is: {y}"\n\n# Append the paragraph element to the body of the webpage\ndocument.body.appendChild(p) \n \n \n \n \n \n Brython environment and  Plotly.js : \n <script src="./../cmsimde/static/brython.js"></script>\n<script src="./../cmsimde/static/brython_stdlib.js"></script>\n<script>// <![CDATA[\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\']});\n}\n// ]]></script>\n<p id="brython_div"></p> \n Brython programe with Plotly.js: \n from browser import document, window\n\ndef dy_dx(y, x):\n    return x - y\n\nx_start = 0\nx_end = 5\nn_points = 100\nx = [x_start + i * (x_end - x_start) / (n_points - 1) for i in range(n_points)]\ny0 = 1.0\nh = x[1] - x[0]\ny = [y0]\nfor i in range(1, len(x)):\n    y.append(y[-1] + h * dy_dx(y[-1], x[i-1]))\n\n# Create a new div element to hold the plot\n#plot_div = document.createElement(\'div\')\n#plot_div.id = \'plot\'\n#document.body.appendChild(plot_div)\nplot_div = document["brython_div"]\n\n# Plot the solution using plotly.js\ndata = [{\'x\': x, \'y\': y}]\nwindow.Plotly.newPlot(\'brython_div\', data) \n This code defines a function dy_dx that represents the mass-spring-damper ordinary differential equation. The Euler method is used to solve this equation for a range of x values from 0 to 20 with initial conditions of y0 = [1.0, 0.0]. The solution is then plotted on the webpage using  plotly.js . \n \n \n \n \n This code defines a function dy_dx that represents the mass-spring-damper system with a PID controller. The gains of the PID controller are set to Kp = 10.0, Ki = 1.0, and Kd = 0.5. The Euler method is used to solve this system of equations for a range of x values from 0 to 20 with initial conditions of y0 = [0.0, 0.0, 0.0, 0.0]. The response of the system is then plotted on the webpage using  plotly.js . \n \n \n \n \n \n \n \n \n', 'tags': '', 'url': 'Brython_ex2.html'}]};