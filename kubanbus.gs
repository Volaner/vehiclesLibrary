include "MapObject.gs"

class KubanBus isclass MapObject
{
	bool curtainEnable, driverEnable, passengersEnable, lightEnable, idle;
    int plate;
	void SetLight(bool swithOn);
    void StartEngine(bool engineOn);

	public void Init(Asset pAsset)
    {
        inherited(pAsset);
    }

    public Soup GetProperties(void)
    {
        Soup pSoup = inherited();

        pSoup.SetNamedTag("curtainEnable", curtainEnable);
        pSoup.SetNamedTag("driverEnable", driverEnable);
        pSoup.SetNamedTag("passengersEnable", passengersEnable);
        pSoup.SetNamedTag("lightEnable", lightEnable);
        pSoup.SetNamedTag("idle", idle);
        pSoup.SetNamedTag("plate", plate);

        return pSoup;
    }

    public void SetProperties(Soup pSoup)
    {
        inherited(pSoup);

        curtainEnable = pSoup.GetNamedTagAsBool("curtainEnable", false);
        driverEnable = pSoup.GetNamedTagAsBool("driverEnable", false);
        passengersEnable = pSoup.GetNamedTagAsBool("passengersEnable", false);
        lightEnable = pSoup.GetNamedTagAsBool("lightEnable", false);
        idle = pSoup.GetNamedTagAsBool("idle", false);
        plate = pSoup.GetNamedTagAsInt("plate", 1);

        SetMeshVisible("curtain", curtainEnable, 0.0f);
        SetMeshVisible("driver", driverEnable, 0.0f);
        SetMeshVisible("p-1", passengersEnable, 0.0f);
        SetMeshVisible("p-2", passengersEnable, 0.0f);
        SetMeshVisible("p-3", passengersEnable, 0.0f);
        SetMeshVisible("p-4", passengersEnable, 0.0f);
        SetLight(lightEnable);
        StartEngine(idle);
        SetMeshVisible("number-front-85rus", 1 == plate, 0.0f);
        SetMeshVisible("number-rear-85rus", 1 == plate, 0.0f);
        SetMeshVisible("number-front-kzhp", 2 == plate, 0.0f);
        SetMeshVisible("number-rear-kzhp", 2 == plate, 0.0f);
    }

    public string GetDescriptionHTML(void)
    {
        string sHtml = inherited();
        sHtml = sHtml
            + "<table border='1'>"
                + "<tr>"
                    + "<td width='150'>Number plate:</td>"
                    + "<td>" + HTMLWindow.CheckBox("live://property/driverEnable", driverEnable) + "&nbsp;Driver" + "</td>"
                + "</tr>"
                + "<tr>"
                    + "<td width='150'>" + HTMLWindow.RadioButton("live://property/plate1", 1 == plate) + "&nbsp;RUS" + "</td>"
                    + "<td>" + HTMLWindow.CheckBox("live://property/passengersEnable", passengersEnable) + "&nbsp;Passengers" + "</td>"
                + "</tr>"
                + "<tr>"
                    + "<td width='150'>" + HTMLWindow.RadioButton("live://property/plate2", 2 == plate) + "&nbsp;USSR" + "</td>"
                    + "<td>" + HTMLWindow.CheckBox("live://property/curtainEnable", curtainEnable) + "&nbsp;Curtain" + "</td>"
                + "</tr>"
                + "<tr>"
                    + "<td width='150'>" + HTMLWindow.RadioButton("live://property/plate0", 0 == plate) + "&nbsp;None" + "</td>"
                    + "<td>" + HTMLWindow.CheckBox("live://property/lightEnable", lightEnable) + "&nbsp;Light(only night)" + "</td>"
                + "</tr>"
                + "<tr>"
                    + "<td width='150'>&nbsp;</td>"
                    + "<td>" + HTMLWindow.CheckBox("live://property/idle", idle) + "&nbsp;Engine on" + "</td>"
                + "</tr>"
            + "</table>";
        return sHtml;
    }

    public string GetPropertyType(string sPropertyId)
    {
        string sRet = "link";
        if(sPropertyId == "curtainEnable"
    		or sPropertyId == "driverEnable"
            or sPropertyId == "passengersEnable"
        	or sPropertyId == "lightEnable"
            or sPropertyId == "idle"
            or sPropertyId[,5] == "plate")
        {
            sRet = "link";
        }
        return sRet;
    }

    public void LinkPropertyValue(string sPropertyId)
    {
        if(sPropertyId == "curtainEnable")
        {
            curtainEnable = !curtainEnable;
        }
        else if (sPropertyId == "driverEnable")
        {
            driverEnable = !driverEnable;
        }
        else if (sPropertyId == "passengersEnable")
        {
            passengersEnable = !passengersEnable;
        }
        else if (sPropertyId == "lightEnable")
        {
            lightEnable = !lightEnable;
        }
        else if (sPropertyId == "idle")
        {
            idle = !idle;
        }
        else if(sPropertyId[,5] == "plate")
        {
            plate = Str.ToInt(sPropertyId[5,]);
        }
    }

    void SetLight(bool swithOn)
    {
        Asset front, rear;
        
        front = GetAsset().FindAsset("frontlight");
        rear = GetAsset().FindAsset("rearlight");

        if(swithOn)
        {
            me.SetFXCoronaTexture("front-left", front);
            me.SetFXCoronaTexture("front-right", front);
            me.SetFXCoronaTexture("rear-left", rear);
            me.SetFXCoronaTexture("rear-right", rear);
        }
        else
        {
            me.SetFXCoronaTexture("front-left", null);
            me.SetFXCoronaTexture("front-right", null);
            me.SetFXCoronaTexture("rear-left", null);
            me.SetFXCoronaTexture("rear-right", null);
        }
    }

    void StartEngine(bool engineOn)
    {
        if(engineOn)
        {
            PlaySoundScriptEvent("engine");
        }
        else
        {
            StopSoundScriptEvent("engine");
        }
    }
};