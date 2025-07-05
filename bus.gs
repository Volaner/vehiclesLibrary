include "Vehicles.gs"

class Bus isclass Vehicles
{
	bool curtainEnable; 
    
    public void Init(Asset pAsset)
    {
        inherited(pAsset);
    }
    
    public Soup GetProperties(void)
    {
        Soup pSoup = inherited();

        pSoup.SetNamedTag("curtainEnable", curtainEnable);

        return pSoup;
    }

    public void SetProperties(Soup pSoup)
    {
        inherited(pSoup);

        bool putCurtain = me.GetAsset().GetConfigSoupCached().GetNamedSoup("extensions").GetNamedTagAsBool("put-curtain");
        curtainEnable = pSoup.GetNamedTagAsBool("curtainEnable", putCurtain);

        SetMeshVisible("curtain", curtainEnable, 0.0f);
    }

    public string GetDescriptionHTML(void)
    {
        additionalOption = "<p>" + HTMLWindow.CheckBox("live://property/curtainEnable", curtainEnable) + "&nbsp;Curtain" + "</p>";

        string sHtml = inherited();

        return sHtml;
    }

    public string GetPropertyType(string sPropertyId)
    {
        if(sPropertyId == "curtainEnable")
        {
            return "link";
        }

        return inherited(sPropertyId);
    }

    public void LinkPropertyValue(string sPropertyId)
    {
        if(sPropertyId == "curtainEnable")
        {
            curtainEnable = !curtainEnable;
        }

        inherited(sPropertyId);
    }
};