const fs = require("fs");
const fetch = require("cross-fetch");
const loaderController = {};

loaderController.getItems = async (req, ress, next) => {
  var { link } = req.query;
  const result = [];
  const regex_group_id = /.*group_id=([^&|\n|\t\s]+)/g;
  const regex_member_id = /.*member_id=([^&|\n|\t\s]+)/g;
  const regex_group_id_token = /.*group_id_token=([^&|\n|\t\s]+)/g;

  link=`https://ar.shein.com/user/wishlist/groups/share?group_id_token=${regex_group_id_token.exec(link)[1]}&group_id=${regex_group_id.exec(link)[1]}&member_id=${regex_member_id.exec(link)[1]}`
  try {
    for (let i = 1; i < 100000; i++) {
      link=link.replace(/(&page\=\d*)/g,'');
      link+="&page="+i
      const res = await fetch(link, {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ar;q=0.7",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          method: "GET",
          mode: "cors",
        },
      });
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      const sns = await res.json();
      
      var goods = new Object({
        goodsSns: sns.info.goodsListInfo.goodsList.map((x) => x.goods_sn),
      });

      const resPrice = await fetch(
        "https://ar.shein.com/product/getPricesByIds?_lang=ar&_ver=1.1.8",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ar;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
          body: JSON.stringify(goods),
          method: "POST",
          mode: "cors",
        }
      );

      if (resPrice.status >= 400) {
        throw new Error("Bad response from server");
      }

      const Prices = await resPrice.json();

      const sss = sns.info.goodsListInfo.goodsList.map(
        (x) => new Object({ ...x, ...Prices.info.prices[x.goods_sn] })
      );
      result.push(...sss);
      if (sns.info.goodsListInfo.total<=result.length){
        break;
      }
    }
    ress.send(result);
  } catch (err) {
    next(error);
  }
};
loaderController.getItemsOff = async (link) => {
  //var { link } = req.query;

  const result = [];
  const regex_group_id = /.*group_id=([^&|\n|\t\s]+)/g;
  const regex_member_id = /.*member_id=([^&|\n|\t\s]+)/g;
  const regex_group_id_token = /.*group_id_token=([^&|\n|\t\s]+)/g;

  arlink=`https://ar.shein.com/user/wishlist/groups/share?group_id_token=${regex_group_id_token.exec(link)[1]}&group_id=${regex_group_id.exec(link)[1]}&member_id=${regex_member_id.exec(link)[1]}`
  try {
    for (let i = 1; i < 100000; i++) {
      arlink=arlink.replace(/(&page\=\d*)/g,'');
      arlink+="&page="+i
      const res = await fetch(arlink, {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ar;q=0.7",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          method: "GET",
          mode: "cors",
        },
      });
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      const sns = await res.json();
      
      var goods = new Object({
        goodsSns: sns.info.goodsListInfo.goodsList.map((x) => x.goods_sn),
      });

      const resPrice = await fetch(
        "https://ar.shein.com/product/getPricesByIds?_lang=ar&_ver=1.1.8",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ar;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
          body: JSON.stringify(goods),
          method: "POST",
          mode: "cors",
        }
      );

      if (resPrice.status >= 400) {
        throw new Error("Bad response from server");
      }

      const Prices = await resPrice.json();

      const sss = sns.info.goodsListInfo.goodsList.map(
        (x) => new Object({ ...x, ...Prices.info.prices[x.goods_sn] })
      );
      result.push(...sss);
      result['info']=sns.info;
      if (sns.info.goodsListInfo.total<=result.length){
        break;
      }
    }
    
    return result;
  } catch (err) {
    throw new Error(err)
  }
};
module.exports = loaderController;
