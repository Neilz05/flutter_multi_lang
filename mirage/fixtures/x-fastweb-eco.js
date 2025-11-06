export const data = [
    {
    "parameters": {
      "Enable": 1,
      "Status": "on",
      "ModeEnabled":"",
      "ModeBase":"",
      "ModeLight":"",
      "ModeDeep":"",
      "ModeCustomized":"",
     "ScheduleRuleNumberOfEntries":1
    },
    "path": "Device.X_ECO."
  },
  
  {
    "parameters":{
      "ID":"",
      "Name":"Test1",
      "Enable":1,
      "ModeEnabled":"light",
      "Mode":"every day",
      "WeekDay":"Mon",
      "StartTime":"10:00",
      "EndTime":"13:00",
    },
    "path": "Device.X_ECO.ScheduleRule.1."
  },
   {
    "parameters":{
      "ID":"",
      "Name":"Test2",
      "Enable":0,
      "ModeEnabled":"deep",
      "Mode":"individual day",
      "WeekDay":"Mon",
      "StartTime":"08:00",
      "EndTime":"09:00",
    },
    "path": "Device.X_ECO.ScheduleRule.2."
  },
  {
    "parameters":{
        "Name":"",
        "Reference":""
    },
    "path":"Device.X_FASTWEB_Alias.1."
  },
  {
    "parameters":{
        "ECO":"light",
        "ECO_Pressure":2,
    },
    "path":"Device.X_FASTWEB_Button."
  },
  {
    "parameters":{
        "WakeUpInterval":60,
        "SeekInterval":60
    },
    "path":"Device.X_ECO.Extender."
  }
 
  
]