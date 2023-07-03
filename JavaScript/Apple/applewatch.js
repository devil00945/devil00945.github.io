const applewatchurl = "https://raw.githubusercontent.com/AliceLi1231/FileStorage/main/applewatchseries8.json"
        let applewatchImages = Array.from(document.querySelectorAll('[applewatch-category="color"]'))
        let applewatchButtonSize = Array.from(document.querySelectorAll('[applewatch-category="size"]'))
        let applewatchButtonNet = Array.from(document.querySelectorAll('[applewatch-category="network"]'))
        let applewatchButtonWristSize = Array.from(document.querySelectorAll('[applewatch-category="wristsize"]'))

        let applewatchPic = document.getElementById("applewatchpic")
        let applewatchPic2 = document.getElementById("applewatchpic2")
        let applewatchColorName = document.getElementById("applewatchcolorname")
        let applewatchTotalPrice = document.querySelector(".applewatchtotalPrice")
        let applewatchSelectedOptions = {};

        let applewatchSelectedPicId = ""
        let applewatchSelectedColorname = ""
        let applewatchSelectedBtnNetId = ""
        let applewatchSelectedBtnSizeId = ""
        let applewatchSelectedBtnWristSize = ""


        

        let applewatchseries8Array = []
        let applewatchxhr = new XMLHttpRequest()

        function requestWatchJson(uri) {
            applewatchxhr.onload = function () {

                applewatchseries8Array = this.response


                applewatchImages.forEach(image => {
                    image.addEventListener("click", () => {
                        const category = image.getAttribute("applewatch-category")
                        const name = image.getAttribute("applewatch-name")
                        if (image.classList.contains("selected")) {
                            image.classList.remove("selected")
                            delete applewatchSelectedOptions[category]
                            applewatchSelectedPicId = null
                        }
                        else {
                            if (applewatchSelectedPicId) {
                                let applewatchPreviousSelectedImage = document.getElementById(applewatchSelectedPicId)
                                applewatchPreviousSelectedImage.classList.remove("selected")
                                delete applewatchSelectedOptions[category]
                            }
                            image.classList.add("selected")
                            applewatchSelectedOptions[category] = name
                            applewatchSelectedPicId = image.id

                            applewatchPic.src = `./applewatch/${applewatchSelectedPicId}.jpg`
                            applewatchPic2.src = `./applewatch/${applewatchSelectedPicId}2.jpg`

                        }

                        updateTotalPrice()
                    })
                })


                applewatchButtonSize.forEach(button => {
                    button.addEventListener("click", () => {
                        const category = button.getAttribute("applewatch-category")
                        const name = button.getAttribute("applewatch-name")
                        if (button.classList.contains("selected")) {
                            button.classList.remove("selected")
                            delete applewatchSelectedOptions[category]
                            applewatchSelectedBtnSizeId = null
                        }
                        else {
                            if (applewatchSelectedBtnSizeId) {
                                let applewatchPreviousSelectedBtnNet = document.getElementById(applewatchSelectedBtnSizeId)
                                applewatchPreviousSelectedBtnNet.classList.remove("selected")
                                delete applewatchSelectedOptions[category]
                            }
                            button.classList.add("selected")
                            applewatchSelectedOptions[category] = name
                            applewatchSelectedBtnSizeId = button.id

                        }
                        updateTotalPrice()
                    })
                })

                applewatchButtonNet.forEach(button => {
                    button.addEventListener("click", () => {
                        const category = button.getAttribute("applewatch-category")
                        const name = button.getAttribute("applewatch-name")
                        if (button.classList.contains("selected")) {
                            button.classList.remove("selected")
                            delete applewatchSelectedOptions[category]
                            applewatchSelectedBtnNetId = null
                        }
                        else {
                            if (applewatchSelectedBtnNetId) {
                                let applewatchPreviousSelectedBtnStorage = document.getElementById(applewatchSelectedBtnNetId)
                                applewatchPreviousSelectedBtnStorage.classList.remove("selected")
                                delete applewatchSelectedOptions[category]
                            }
                            button.classList.add("selected")
                            applewatchSelectedOptions[category] = name
                            applewatchSelectedBtnNetId = button.id

                        }
                        updateTotalPrice()
                    })
                })

                applewatchButtonWristSize.forEach(button => {
                    button.addEventListener("click", () => {
                        const category = button.getAttribute("applewatch-category")
                        const name = button.getAttribute("applewatch-name")
                        if (button.classList.contains("selected")) {
                            button.classList.remove("selected")
                            delete applewatchSelectedOptions[category]
                            applewatchSelectedBtnWristSize = null;
                        }
                        else {
                            if (applewatchSelectedBtnWristSize) {
                                let applewatchPreviousSelectedBtnStorage = document.getElementById(applewatchSelectedBtnWristSize)
                                applewatchPreviousSelectedBtnStorage.classList.remove("selected")
                                delete applewatchSelectedOptions[category]
                            }
                            button.classList.add("selected")
                            applewatchSelectedOptions[category] = name
                            applewatchSelectedBtnWristSize = button.id

                        }

                    })
                })

                function updateTotalPrice() {
                    const applewatchSelectedColor = applewatchSelectedOptions["color"]
                    const applewatchSelectedSize = applewatchSelectedOptions["size"]
                    const applewatchSelectedNet = applewatchSelectedOptions["network"]
                    applewatchColorName.innerText = applewatchSelectedColor
                    if (applewatchSelectedColor && applewatchSelectedSize && applewatchSelectedNet) {
                        const applewatchFilteredProducts = applewatchseries8Array.filter(p => p.color === applewatchSelectedColor && p.size === applewatchSelectedSize && p.network === applewatchSelectedNet)
                        if (applewatchFilteredProducts.length > 0) {
                            applewatchTotalPrice.innerText = "NT$" + applewatchFilteredProducts[0].price
                        } else {
                            applewatchTotalPrice.innerText = "NT$"
                        }
                    }
                    else if (applewatchSelectedColor && applewatchSelectedSize) {
                        const applewatchFilteredProducts = applewatchseries8Array.filter(p => p.color === applewatchSelectedColor && p.size === applewatchSelectedSize)
                        applewatchTotalPrice.innerText = "NT$" + applewatchFilteredProducts[0].price
                    }
                    else if (applewatchSelectedSize && applewatchSelectedNet) {
                        const applewatchFilteredProducts = applewatchseries8Array.filter(p => p.size === applewatchSelectedSize && p.network === applewatchSelectedNet)
                        applewatchTotalPrice.innerText = "NT$" + applewatchFilteredProducts[0].price
                    }

                    else {
                        applewatchTotalPrice.innerText = "NT$"
                    }
                }

            }

            applewatchxhr.open("GET", uri)
            applewatchxhr.responseType = "json"
            applewatchxhr.send();
        }
