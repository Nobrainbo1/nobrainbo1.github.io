const calculateVAT = () => {
    const basePrice = $("#basePrice").val();
    const vat = basePrice * ($("#vatPercent").val() / 100);
    $("#result").html
        (`VAT: ${vat.toFixed(2)}`);
}

const calculateWithVAT = () => {
    const vat = $("#vat").val();
    const basePrice = vat / (1 + ($("#vatPercent").val() / 100));
    const vatAmount = vat - basePrice;
    $("#resultWithVAT").html
        (`Base Price: ${basePrice.toFixed(2)}<br>
        VAT: ${vatAmount.toFixed(2)}<br>
        `);

}