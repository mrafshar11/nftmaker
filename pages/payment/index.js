
import Script from 'next/script'

const Payment = () => {
    const pKey = process.env.PRICING_TABLE_ID;
    const pId = process.env.PUBLISHABLE_KEY;

    return (
        <section>
            <Script async src="https://js.stripe.com/v3/pricing-table.js"></Script>
            <stripe-pricing-table
                pricing-table-id={pId}
                publishable-key={pKey}
            >
            </stripe-pricing-table>
        </section>
    )
}

export default Payment;