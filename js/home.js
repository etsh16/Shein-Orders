function loadLink(){
    var link = $('#bord-link').val();
    $.ajax({
        url: "/api/shein",
        type: 'GET',
        data:{link},
        success: function(res) {
            var priceOr=0;
            var priceOv=0;
            res.forEach((item,i) => {
                priceOr+=+parseFloat(item.salePrice.amount)
                $('#total-items').text(i+1);
                $('#total-or-price').text(priceOr);
                $('#total-eg-price').text(priceOr*4.5);
                $('#total-over').text(priceOv);
            });
            var content=`<div class="card col-10 mx-auto mt-4">
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Price as SR</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price as EGP</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                  </tr>
                </thead>
                <tbody>
                ${
                    res.map((item,i) => `
                    <tr>
                    <td>
                    <p class="text-xs font-weight-bold mb-0">${i+1}</p>
                  </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img src="${item.goods_img}" class="avatar avatar-xxl shadow-lg me-3">
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text">${item.goods_name}</h6>
                          <p class="text text-secondary mb-0">${item.goods_url_name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text font-weight-bold mb-0">${item.salePrice.amount} RS</p>
                    </td>
                    <td >
                    <p class="text font-weight-bold mb-0">${item.salePrice.amount*4.5} EGP</p>
                    </td>
                    <td class="align-middle">
                    <a href="//ar.shein.com/${item.goods_url_name.replaceAll(' ','-')}-p-${item.goods_id}.html" target="_blank" class="btn btn-primary btn-xs" data-toggle="tooltip" data-original-title="Edit user">
                    <i class="ni ni-shop"></i>
                    </a>
                  </tr>`)}
                </tbody>
              </table>
            </div>
          </div>`;

            $('#result').html(content)
        }
    });
}