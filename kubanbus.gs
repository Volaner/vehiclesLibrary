include "MapObject.gs"

class KubanBus isclass MapObject
{
	bool curtainEnable, driverEnable, passengersEnable, lightEnable, idle;
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

        SetMeshVisible("curtain", curtainEnable, 0.0f);
        SetMeshVisible("driver", driverEnable, 0.0f);
        SetMeshVisible("p-1", passengersEnable, 0.0f);
        SetMeshVisible("p-2", passengersEnable, 0.0f);
        SetMeshVisible("p-3", passengersEnable, 0.0f);
        SetMeshVisible("p-4", passengersEnable, 0.0f);
        SetLight(lightEnable);
        StartEngine(idle);
    }

    public string GetDescriptionHTML(void)
    {
        string sHtml = inherited();
        sHtml = sHtml
            + "<p>" + HTMLWindow.CheckBox("live://property/driverEnable", driverEnable) + "&nbsp;Driver" + "</p>"
            + "<p>" + HTMLWindow.CheckBox("live://property/passengersEnable", passengersEnable) + "&nbsp;Passengers" + "</p>"
            + "<p>" + HTMLWindow.CheckBox("live://property/curtainEnable", curtainEnable) + "&nbsp;Curtain" + "</p>"
            + "<p>" + HTMLWindow.CheckBox("live://property/lightEnable", lightEnable) + "&nbsp;Light(only night)" + "</p>"
            + "<p>" + HTMLWindow.CheckBox("live://property/idle", idle) + "&nbsp;Engine on" + "</p>";
        return sHtml;
    }

    public string GetPropertyType(string sPropertyId)
    {
        string sRet = "link";
        if(sPropertyId == "curtainEnable"
    		or sPropertyId == "driverEnable"
            or sPropertyId == "passengersEnable"
        	or sPropertyId == "lightEnable"
            or sPropertyId == "idle")
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