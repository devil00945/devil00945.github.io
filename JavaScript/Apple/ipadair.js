const ipadairurl = "https://raw.githubusercontent.com/AliceLi1231/FileStorage/main/ipadair2022.json"
let ipadairImages = Array.from(document.querySelectorAll('[ipadair-category="color"]'))
let ipadairButtonStorage = Array.from(document.querySelectorAll('[ipadair-category="storage"]'))
let ipadairButtonNetwork = Array.from(document.querySelectorAll('[ipadair-category="network"]'))

let ipadairPic = document.getElementById('ipadairpic')
let ipadairPic2 = document.getElementById('ipadairpic2')
let storagePic = document.getElementById('storagepic')
let ipadairTotalPrice = document.querySelector(".ipadairtotalPrice");
let ipadairSelectedOptions = {};

let ipadairSelectedPicId = ""
let ipadairSelectedBtnGBId = ""
let ipadairSelectedBtnNetId = ""




let ipadArray = []
let ipadairxhr = new XMLHttpRequest()

function requestIpadJson(uri) {
    ipadairxhr.onload = function () {

        ipadArray = this.response

         
        ipadairImages.forEach(image => {
            image.addEventListener("click", () => {
                const category = image.getAttribute("ipadair-category")
                const name = image.getAttribute("ipadair-name")
                if (image.classList.contains("selected")) {
                    image.classList.remove("selected")
                    delete ipadairSelectedOptions[category]
                    ipadairSelectedPicId = null;
                }
                else {
                    if (ipadairSelectedPicId) {
                        let ipadairPreviousSelectedImage = document.getElementById(ipadairSelectedPicId)
                        ipadairPreviousSelectedImage.classList.remove("selected")
                        delete ipadairSelectedOptions[category]
                    }
                    image.classList.add("selected")
                    ipadairSelectedOptions[category] = name
                    ipadairSelectedPicId = image.id
                    ipadairPic.src = `./ipadair/${ipadairSelectedPicId}.jpg`
                    ipadairPic2.src = `./ipadair/${ipadairSelectedPicId}2.jpg`
                    storagePic.src = `./ipadair/${ipadairSelectedPicId}.jpg`
                }
                updateTotalPrice()
            })
        })

        ipadairButtonStorage.forEach(button => {
            button.addEventListener("click", () => {
                const category = button.getAttribute("ipadair-category")
                const name = button.getAttribute("ipadair-name")
                if (button.classList.contains("selected")) {
                    button.classList.remove("selected")
                    delete ipadairSelectedOptions[category]
                    ipadairSelectedBtnGBId = null;
                }
                else {
                    if (ipadairSelectedBtnGBId) {
                        let ipadairPreviousSelectedBtnStorage = document.getElementById(ipadairSelectedBtnGBId)
                        ipadairPreviousSelectedBtnStorage.classList.remove("selected")
                        delete ipadairSelectedOptions[category]
                    }
                    button.classList.add('selected')
                    ipadairSelectedOptions[category] = name
                    ipadairSelectedBtnGBId = button.id

                }
                updateTotalPrice()
            })
        })

        ipadairButtonNetwork.forEach(button => {
            button.addEventListener("click", () => {
                const category = button.getAttribute("ipadair-category")
                const name = button.getAttribute("ipadair-name")
                if (button.classList.contains("selected")) {
                    button.classList.remove("selected")
                    delete ipadairSelectedOptions[category];
                    ipadairSelectedBtnNetId = null;
                }
                else {
                    if (ipadairSelectedBtnNetId) {
                        let ipadairPreviousSelectedBtnNet = document.getElementById(ipadairSelectedBtnNetId)
                        ipadairPreviousSelectedBtnNet.classList.remove("selected")
                        delete ipadairSelectedOptions[category]
                    }
                    button.classList.add("selected")
                    ipadairSelectedOptions[category] = name
                    ipadairSelectedBtnNetId = button.id

                }
                updateTotalPrice()
            })
        })


        function updateTotalPrice() {
            const ipadairSelectedColor = ipadairSelectedOptions["color"]
            const ipadairSelectedStorage = ipadairSelectedOptions["storage"]
            const ipadairSelectedNetwork = ipadairSelectedOptions["network"]

            if (ipadairSelectedColor && ipadairSelectedStorage && ipadairSelectedNetwork) {
                const ipadairFilteredProducts = ipadArray.filter(p => p.color === ipadairSelectedColor && p.storage === ipadairSelectedStorage && p.network === ipadairSelectedNetwork)
                if (ipadairFilteredProducts.length > 0) {
                    ipadairTotalPrice.innerText = "NT$" + ipadairFilteredProducts[0].price
                } else {
                    ipadairTotalPrice.innerText = "NT$"
                }
            }
            else if (ipadairSelectedColor && ipadairSelectedStorage) {
                const ipadairFilteredProducts = ipadArray.filter(p => p.color === ipadairSelectedColor && p.storage === ipadairSelectedStorage)
                ipadairTotalPrice.innerText = "NT$" + ipadairFilteredProducts[0].price
            }

            else {
                ipadairTotalPrice.innerText = "NT$"
            }
        }

    }

    ipadairxhr.open("GET", uri)
    ipadairxhr.responseType = "json"
    ipadairxhr.send();
}