export const mapFromInfo = (data, state) => {
    return {
        ...state,
        fName: data.fName,
        lName: data.lName,
        b_id: data.b_id,
        billing: {
            street: data.b_address,
            city: data.b_city,
            province: data.b_stateprovince,
            country: data.b_country,
            zip: data.b_zipcode,
        },
        s_id: data.s_id,
        shipping: {
            street: data.s_address,
            city: data.s_city,
            province: data.s_stateprovince,
            country: data.s_country,
            zip: data.s_zipcode,
        },

    }
}

export const mapToInfo = (state, token, cart) => {
    return {
        token: token,
        fName: state.fName,
        lName: state.lName,
        b_id: state.b_id,
        b_fname: state.fName,
        b_lname: state.lName,
        b_address: state.billing.street,
        b_city: state.billing.city,
        b_country: state.billing.country,
        b_stateprovince: state.billing.province,
        b_zipcode: state.billing.zip,
        s_id: state.s_id,
        s_fname: state.fName,
        s_lname: state.lName,
        s_address: state.shipping.street,
        s_city: state.shipping.city,
        s_country: state.shipping.country,
        s_stateprovince: state.shipping.province,
        s_zipcode: state.shipping.zip,
        cart: cart,
        payment: state.payment
      }
}