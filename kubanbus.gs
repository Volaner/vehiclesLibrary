include "MapObject.gs"

class KubanBus isclass MapObject
{
	bool curtainEnable, driverEnable, passengersEnable;

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

        return pSoup;
    }

    public void SetProperties(Soup pSoup)
    {
        inherited(pSoup);

        curtainEnable = pSoup.GetNamedTagAsBool("curtainEnable", false);
        driverEnable = pSoup.GetNamedTagAsBool("driverEnable", false);
        passengersEnable = pSoup.GetNamedTagAsBool("passengersEnable", false);

        SetMeshVisible("curtain", curtainEnable, 0.0f);
        SetMeshVisible("driver", driverEnable, 0.0f);
        SetMeshVisible("p-1", passengersEnable, 0.0f);
        SetMeshVisible("p-2", passengersEnable, 0.0f);
        SetMeshVisible("p-3", passengersEnable, 0.0f);
        SetMeshVisible("p-4", passengersEnable, 0.0f);
    }

    public string GetDescriptionHTML(void)
    {
        string sHtml = inherited();
        sHtml = sHtml
            + "<p>" + HTMLWindow.CheckBox("live://property/driverEnable", driverEnable) + "&nbsp;Driver" + "</p>"
            + "<p>" + HTMLWindow.CheckBox("live://property/passengersEnable", passengersEnable) + "&nbsp;Passengers" + "</p>"
            + "<p>" + HTMLWindow.CheckBox("live://property/curtainEnable", curtainEnable) + "&nbsp;Curtain" + "</p>";
        return sHtml;
    }

    public string GetPropertyType(string sPropertyId)
    {
        string sRet = "link";
        if(sPropertyId == "curtainEnable"
    		or sPropertyId == "driverEnable"
            or sPropertyId == "passengersEnable")
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
    }
};