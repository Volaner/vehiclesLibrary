include "MapObject.gs"

class KubanBus isclass MapObject
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

        curtainEnable = pSoup.GetNamedTagAsBool("curtainEnable", false);

        SetMeshVisible("curtain", curtainEnable, 0.0f);
    }

    public string GetDescriptionHTML(void)
    {
        string sHtml = inherited();
        sHtml = sHtml
            + "<p>" + HTMLWindow.CheckBox("live://property/curtainEnable", curtainEnable) + "&nbsp;Curtain" + "</p>";
        return sHtml;
    }

    public string GetPropertyType(string sPropertyId)
    {
        string sRet = "link";
        if(sPropertyId == "curtainEnable")
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
    }
};