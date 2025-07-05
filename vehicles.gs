include "MapObject.gs"

class Vehicles isclass MapObject
{
	bool driverEnable, passengersEnable, lightEnable, idle;
	int plate;
    bool hasUssrB, hasUssrW, hasP1, hasP2, hasP3, hasP4 = false;
	string additionalOption = "";
	void SetLight(bool swithOn);
    void StartEngine(bool engineOn);
    void PutNumberPlate(int plate);
    bool hasNamedMesh(string name);
    string printPlate(int index, string label, bool hasPlate);
    string printPassengers(void);
    void checkMeshes(void);

    public void Init(Asset pAsset)
    {
        inherited(pAsset);

        checkMeshes();
    }

    public Soup GetProperties(void)
    {
        Soup pSoup = inherited();

        pSoup.SetNamedTag("driverEnable", driverEnable);
        if(hasP1)
        {
            pSoup.SetNamedTag("passengersEnable", passengersEnable);
        }
        pSoup.SetNamedTag("lightEnable", lightEnable);
        pSoup.SetNamedTag("idle", idle);
        pSoup.SetNamedTag("plate", plate);

        return pSoup;
    }

    public void SetProperties(Soup pSoup)
    {
        inherited(pSoup);

        driverEnable = pSoup.GetNamedTagAsBool("driverEnable", false);
        if(hasP1)
        {
            passengersEnable = pSoup.GetNamedTagAsBool("passengersEnable", false);
        }
        lightEnable = pSoup.GetNamedTagAsBool("lightEnable", false);
        idle = pSoup.GetNamedTagAsBool("idle", false);
        plate = pSoup.GetNamedTagAsInt("plate", 1);

        SetMeshVisible("driver", driverEnable, 0.0f);
        if(hasP1){ SetMeshVisible("p-1", passengersEnable, 0.0f); }
        if(hasP2){ SetMeshVisible("p-2", passengersEnable, 0.0f); }
        if(hasP3){ SetMeshVisible("p-3", passengersEnable, 0.0f); }
        if(hasP4){ SetMeshVisible("p-4", passengersEnable, 0.0f); }
        SetLight(lightEnable);
        StartEngine(idle);
        PutNumberPlate(plate);
    }

    public string GetDescriptionHTML(void)
    {
        string sHtml = inherited();

        sHtml = sHtml
            + "<p>" + HTMLWindow.CheckBox("live://property/driverEnable", driverEnable) + "&nbsp;Driver" + "</p>"
            + printPassengers()
            + "<p>" + HTMLWindow.CheckBox("live://property/lightEnable", lightEnable) + "&nbsp;Light(only night)" + "</p>"
            + "<p>" + HTMLWindow.CheckBox("live://property/idle", idle) + "&nbsp;Engine on" + "</p>"
            + additionalOption
            + "<p>&nbsp;</p>"
            + "<p>Number plate:</p>"
            + printPlate(1, "RUS", true)
            + printPlate(3, "USSR-65", hasUssrB)
            + printPlate(2, "USSR-77", hasUssrW)
            + printPlate(0, "None", true);

        return sHtml;
    }

    public string GetPropertyType(string sPropertyId)
    {
        string sRet = "link";
        if(sPropertyId == "driverEnable"
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
        if (sPropertyId == "driverEnable")
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

    void PutNumberPlate(int plate)
    {
        SetMeshVisible("number-rus-f", 1 == plate, 0.0f);
        SetMeshVisible("number-rus-r", 1 == plate, 0.0f);
        if(hasUssrW)
        {
            SetMeshVisible("number-ussrwhite-f", 2 == plate, 0.0f);
            SetMeshVisible("number-ussrwhite-r", 2 == plate, 0.0f);
        }
        if(hasUssrB)
        {
            SetMeshVisible("number-ussrblack-f", 3 == plate, 0.0f);
            SetMeshVisible("number-ussrblack-r", 3 == plate, 0.0f);
        }
    }

    bool hasNamedMesh(string name)
    {
        bool hasMesh = false;

        int count = me.GetAsset().GetConfigSoupCached().GetNamedSoup("mesh-table").GetNamedSoup(name).CountTags();

        if(count > 0)
        {
            hasMesh = true;
        }
        
        return hasMesh;
    }

    string printPlate(int index, string label, bool hasPlate)
    {
        string bHtml = "";
        string url;

        if(hasPlate)
        {
            url = "live://property/plate" + (string)index;
            bHtml = "<p>" + HTMLWindow.RadioButton(url, index == plate) + "&nbsp;" + label + "</p>";
        }

        return bHtml;
    }

    string printPassengers(void)
    {
        string cHtml = "";

        if(hasP1)
        {
            cHtml = "<p>" + HTMLWindow.CheckBox("live://property/passengersEnable", passengersEnable) + "&nbsp;Passengers" + "</p>";
        }

        return cHtml;        
    }

    void checkMeshes(void)
    {
        if(hasNamedMesh("number-ussrwhite-f") and hasNamedMesh("number-ussrwhite-r"))
        {
            hasUssrW = true;
        }

        if(hasNamedMesh("number-ussrblack-f") and hasNamedMesh("number-ussrblack-r"))
        {
            hasUssrB = true;
        }

        if(hasNamedMesh("p-1"))
        {
            hasP1 = true;
        }
        if(hasNamedMesh("p-2"))
        {
            hasP2 = true;
        }
        if(hasNamedMesh("p-3"))
        {
            hasP3 = true;
        }
        if(hasNamedMesh("p-4"))
        {
            hasP4 = true;
        }
    }
};