import React, { useRef, useEffect } from "react";

function Paypal(props) {

    const paypal = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: props.data[0].name,
                                amount: {
                                    currency_code: "EUR",
                                    value: props.data[0].price,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err)
                },
            })
            .render(paypal.current);
    }, []);

    return(
        <div>
            <div ref={paypal}></div>
        </div>
    );
}


export default Paypal;