// Comprehensive Terms and Conditions, Sale, Shipping, Return/Exchange and Privacy Policy
// Generated verbatim from official legal documentation.

export interface LegalContactItem {
    label: string;
    value: string;
    href?: string;
}

export interface LegalClause {
    number?: string;
    text: string;
    bullets?: string[];
    contact?: LegalContactItem[];
}

export interface LegalSection {
    number: number;
    title: string;
    id?: string;
    callout?: boolean;
    clauses: LegalClause[];
}

export interface LegalDocument {
    title: string;
    preamble: string[];
    sections: LegalSection[];
    quickLinks: { label: string; href: string }[];
}

export const legalQuickLinks = [
    {
        "label": "Terms of Service",
        "href": "#terms"
    },
    {
        "label": "Cancellation Policy",
        "href": "#cancellation"
    },
    {
        "label": "Shipping & Delivery",
        "href": "#shipping"
    },
    {
        "label": "Returns & Final Sale",
        "href": "#returns"
    },
    {
        "label": "Jewellery Care",
        "href": "#care"
    },
    {
        "label": "Privacy Policy",
        "href": "#privacy"
    },
    {
        "label": "Grievance Redressal",
        "href": "#grievance"
    }
];

export const legalDocument: LegalDocument = {
    title: "COMPREHENSIVE TERMS AND CONDITIONS, SALE, SHIPPING, RETURN/EXCHANGE AND PRIVACY POLICY",
    preamble: [
        "These Terms and Conditions or Policy govern access to and use of the website, social-media storefronts, digital platforms, applications, physical store(s), products and services operated or offered under the brand name 'ANAYAS JEWELS' (hereinafter referred to as 'Anayas Jewels', 'Company', 'we', 'us' or 'our').",
        "Please read these Terms of Service carefully before accessing or using our website. By visiting, accessing or using our website/platform, communicating with us through any digital channel, placing an order, making a purchase, or otherwise availing any product or service offered by Anayas Jewels, the customer ('Customer', 'you' or 'your') acknowledges that he/she has read, understood and agreed to be bound by these Terms and the policies incorporated herein. If you do not agree to all the terms and conditions of this agreement, then you may not access use or transact through the Platform or use any services."
    ],
    quickLinks: legalQuickLinks,
    sections: [
        {
            "number": 1,
            "title": "DEFINITIONS",
            "id": "terms",
            "callout": false,
            "clauses": [
                {
                    "number": "1.1",
                    "text": "\"Customer\" means any person who visits the Platform, communicates with Anayas Jewels, places an order or purchases any Product.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "1.2",
                    "text": "\"Product\" means artificial jewellery, fashion jewellery, accessories, gift items and such other products as may be offered by Anayas Jewels from time to time.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "1.3",
                    "text": "\"Platform\" means the website, mobile interface, social-media pages, digital storefronts, communication channels and other online or offline channels operated or authorised by Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "1.4",
                    "text": "\"Order\" means a request placed by the Customer for purchase of one or more Products.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "1.5",
                    "text": "\"Order Confirmation\" means the electronic, written or other confirmation issued by Anayas Jewels acknowledging acceptance of an Order.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 2,
            "title": "ACCEPTANCE AND APPLICABILITY OF TERMS",
            "callout": false,
            "clauses": [
                {
                    "number": "2.1",
                    "text": "These Terms constitute the complete terms governing the Customer's use of the Platform and purchase of Products from Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "2.2",
                    "text": "Placement of an Order/payment for a Product/acceptance of delivery/or purchase of a Product from the physical store shall constitute the Customer's acceptance of these Terms.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "2.3",
                    "text": "Product-specific conditions, promotional terms, offers, invoices and other written conditions expressly communicated by Anayas Jewels shall form part of the transaction and shall be read together with these Terms.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "2.4",
                    "text": "In the event of any inconsistency, the specific written terms expressly applicable to a particular Product or transaction shall prevail to the extent of such inconsistency, subject to applicable law.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "2.5",
                    "text": "Anayas Jewels reserves the right to amend, modify, replace or update these Terms from time to time.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 3,
            "title": "NATURE OF PRODUCTS",
            "callout": false,
            "clauses": [
                {
                    "number": "3.1",
                    "text": "Anayas Jewels primarily deals in artificial/fashion jewellery and related products. Unless expressly stated otherwise in the product description, the Products are not represented as being made of solid gold, silver, platinum or other precious metals.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "3.2",
                    "text": "Any reference to plating, coating, finish, stones, beads, crystals, pearls, colours, materials or other characteristics shall have the meaning specifically stated in the applicable Product description.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "3.3",
                    "text": "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate. Product photographs are intended for representation purposes. Actual colour, appearance, texture, size and finish may vary marginally depending upon lighting conditions, photography, display settings, manufacturing batches and the Customer's device or screen. Minor variations in colour, texture, finish, size, pattern or appearance which do not materially alter the Product shall not constitute a ground for cancellation, return, refund or exchange.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "3.4",
                    "text": "Artificial jewellery may naturally be affected by exposure to water, moisture, sweat, perfumes, cosmetics, chemicals, sanitizers, chlorine, detergents and other substances. Such effects, including fading, discolouration, oxidation, tarnishing, wear of plating or deterioration caused by use or storage conditions, shall not constitute a defect unless expressly warranted otherwise by Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "3.5",
                    "text": "The Customer is responsible for following any care, usage and storage instructions provided with or in relation to the Product.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 4,
            "title": "PRODUCT INFORMATION AND AVAILABILITY",
            "callout": false,
            "clauses": [
                {
                    "number": "4.1",
                    "text": "Anayas Jewels endeavours to ensure that Product descriptions, photographs, prices, specifications and availability displayed on the Platform are accurate and current. However, inadvertent typographical, technical, pricing, inventory or descriptive errors may occur. Anayas Jewels reserves the right to correct such errors and, where necessary, cancel or modify an affected Order.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "4.2",
                    "text": "Product availability is subject to stock. Display of a Product on the Platform does not constitute a guarantee that the Product will remain available until the Order is accepted and processed.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "4.3",
                    "text": "Anayas Jewels may, at its discretion and subject to applicable law, limit quantities, restrict sales, discontinue Products or refuse Orders where circumstances warrant.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "4.4",
                    "text": "Anayas Jewels reserves the right to refuse Orders which appear to involve fraud, misuse of promotional benefits, resale, unauthorised commercial activity, suspicious payment activity or other unlawful or abusive conduct.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 5,
            "title": "PRICES, TAXES AND OTHER CHARGES",
            "callout": false,
            "clauses": [
                {
                    "number": "5.1",
                    "text": "The price payable for a Product shall be the price displayed or otherwise communicated by Anayas Jewels at the time of purchase, subject to correction of any manifest error.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "5.2",
                    "text": "All applicable taxes, duties, levies, charges and statutory amounts shall be borne and paid by the Customer.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "5.3",
                    "text": "Delivery, shipping, handling, packaging, COD or other transaction-related charges, wherever applicable, shall be payable by the Customer and shall be separately disclosed at or before checkout/invoicing.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "5.4",
                    "text": "Where applicable law requires taxes or compulsory charges to be included in the displayed total price, the Platform shall display the same in the manner prescribed by law.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "5.5",
                    "text": "Promotional prices, discounts, coupon codes and other offers shall be governed by the specific terms applicable to the relevant offer. Unless expressly stated otherwise, promotional offers cannot be combined with other offers, discounts or benefits.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "5.6",
                    "text": "Anayas Jewels reserves the right to withdraw, modify or discontinue any promotional offer at any time, subject to applicable law and transactions already validly completed.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 6,
            "title": "ORDER PLACEMENT AND ACCEPTANCE",
            "callout": false,
            "clauses": [
                {
                    "number": "6.1",
                    "text": "The Customer shall provide complete, accurate and current information while placing an Order, including name, mobile number, email address, billing address, shipping address and payment details, as applicable.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "6.2",
                    "text": "An Order shall be treated as successfully placed only after the applicable payment process has been completed and the Order has been accepted/confirmed by Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "6.3",
                    "text": "An order acknowledgement or automated communication shall not, by itself, constitute final acceptance where the Order remains subject to verification, stock availability, payment confirmation or other processing requirements.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "6.4",
                    "text": "Anayas Jewels may cancel an Order, wholly or partly, where:",
                    "bullets": [
                        "a) the Product is unavailable;",
                        "b) the Product or price was displayed due to an inadvertent technical or clerical error;",
                        "c) the transaction appears fraudulent, suspicious or unauthorised;",
                        "d) payment is unsuccessful or reversed;",
                        "e) the Customer has provided incomplete, incorrect or unverifiable information;",
                        "f) delivery to the specified address is not reasonably possible; or",
                        "g) cancellation is required by applicable law or circumstances beyond the reasonable control of Anayas Jewels."
                    ],
                    "contact": []
                },
                {
                    "number": "6.5",
                    "text": "Where Anayas Jewels cancels an Order after receiving payment and a refund is legally or contractually required, the amount shall be processed through the applicable payment channel or such other lawful mode as may be communicated by Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "6.6",
                    "text": "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 7,
            "title": "PAYMENT",
            "callout": false,
            "clauses": [
                {
                    "number": "7.1",
                    "text": "Payments may be made through such payment methods as are made available by Anayas Jewels from time to time. The Customer represents that he/she is authorised to use the payment method employed for the transaction.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "7.2",
                    "text": "Anayas Jewels does not ordinarily retain complete card or banking credentials where payment is processed through an authorised third-party payment gateway. Payment processing may be subject to the terms and privacy practices of the relevant payment service provider.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "7.3",
                    "text": "Anayas Jewels shall not be responsible for any failure, delay, reversal or interruption attributable to a bank, payment gateway, card network, UPI service provider or other third-party payment intermediary.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 8,
            "title": "CANCELLATION POLICY",
            "id": "cancellation",
            "callout": false,
            "clauses": [
                {
                    "number": "8.1",
                    "text": "Once an Order has been confirmed/processed by Anayas Jewels, the Customer shall not have any contractual right to cancel the Order merely due to change of mind, change in preference, change in colour/size requirement, delay in requirement, purchase made by mistake or any similar reason.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "8.2",
                    "text": "Anayas Jewels may, at its discretion consider a cancellation request received before processing or dispatch. Acceptance of such request shall be entirely subject to the confirmation of Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "8.3",
                    "text": "A Customer shall not be entitled to cancellation merely because the Product has not yet been delivered where the delay is attributable to the courier, logistics provider, weather, natural events, governmental restrictions, address-related issues or other circumstances beyond the reasonable control of Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "8.4",
                    "text": "In case of orders made through cash on delivery mode, the amount of refund (if payable) will be refunded to the bank account of the customer only.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 9,
            "title": "SHIPPING AND DELIVERY POLICY",
            "id": "shipping",
            "callout": false,
            "clauses": [
                {
                    "number": "9.1",
                    "text": "Anayas Jewels may engage independent courier, logistics and delivery service providers for delivery of Products.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "9.2",
                    "text": "The Customer shall provide a complete and accurate delivery address, contact number and other information necessary for successful delivery.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "9.3",
                    "text": "Delivery timelines displayed on the Platform or communicated by Anayas Jewels are indicative estimates. Delivery may be affected by weather conditions, natural calamities, strikes, local restrictions, governmental restrictions, festivals, courier capacity, transportation disruptions, incorrect address, unavailability of the recipient or other circumstances beyond the reasonable control of Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "9.4",
                    "text": "The Customer shall bear all applicable delivery/shipping/handling charges. Where a delivery charge is applicable, the same will be communicated to the Customer at or before the completion of the transaction.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "9.5",
                    "text": "Upon dispatch, the Customer may receive tracking information through email, SMS, WhatsApp or any other communication channel used by Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "9.6",
                    "text": "The Customer shall ensure that an authorised person is available to receive the shipment. Repeated failure to accept delivery, refusal to receive the shipment or provision of an incorrect address may result in additional delivery/re-shipping charges being imposed.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "9.7",
                    "text": "If a shipment is returned to Anayas Jewels because of the Customer's refusal, non-availability, incorrect address or failure to comply with delivery requirements, Anayas Jewels shall have the right to withhold further dispatch until the Customer bears applicable re-shipping/handling charges.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "9.8",
                    "text": "Where the Product is visibly damaged at the time of delivery, the Customer should immediately record the condition of the package/Product and notify Anayas Jewels without delay. Any such communication shall be treated as a complaint for investigation and shall not, by itself, create a right of return or refund.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 10,
            "title": "FINAL SALE - NO RETURN, NO EXCHANGE AND NO REFUND",
            "id": "returns",
            "callout": true,
            "clauses": [
                {
                    "number": "10.1",
                    "text": "All sales made by Anayas Jewels are final. Anayas Jewels does not provide any general or voluntary return, refund or exchange facility for Products once sold.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "10.2",
                    "text": "Accordingly, after purchase/confirmation/delivery, as applicable, the Customer shall not be entitled to return, exchange or seek refund merely because:",
                    "bullets": [
                        "a) the Customer has changed his/her mind;",
                        "b) the Product is no longer required;",
                        "c) the Customer does not like the Product;",
                        "d) the Product does not match the Customer's expectation of colour, appearance or finish;",
                        "e) the Customer selected an incorrect size, colour, design or variant;",
                        "f) the Customer purchased the Product by mistake;",
                        "g) the Product was purchased as a gift and is not desired by the recipient;",
                        "h) the Customer subsequently finds a different Product preferable;",
                        "i) the Customer experiences normal wear, fading, tarnishing, discolouration or deterioration attributable to use, storage or exposure; or",
                        "j) any other reason which does not amount to a non-excludable statutory right."
                    ],
                    "contact": []
                },
                {
                    "number": "10.3",
                    "text": "No exchange of a Product for another design, size, colour, variant or Product shall be permitted after sale.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "10.4",
                    "text": "No cash refund, bank refund, wallet credit, store credit or replacement shall be payable merely because the Customer wishes to return or exchange a Product after purchase.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "10.5",
                    "text": "Products sold under a discount, promotional offer, clearance/sale offer or special pricing shall also be treated as final sale, unless a contrary condition is expressly stated in writing by Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "10.6",
                    "text": "Nothing contained in this clause shall be construed as excluding or restricting any right, remedy or liability which cannot lawfully be excluded or restricted under applicable law or pursuant to an order of a competent statutory authority or court.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "10.7",
                    "text": "Except for such mandatory rights, if any, the Customer expressly acknowledges that the purchase is made on a final-sale basis and that Anayas Jewels shall have no contractual obligation to accept any return, exchange or refund.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 11,
            "title": "PRODUCT INSPECTION AND ACCEPTANCE",
            "callout": false,
            "clauses": [
                {
                    "number": "11.1",
                    "text": "The Customer is advised to inspect the Product and packaging upon receipt. The Customer should verify the Product, design, quantity and visible condition against the Order before using the Product.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "11.2",
                    "text": "Any complaint concerning a Product shall be communicated to Anayas Jewels promptly with the Order/invoice details and such photographs, videos or other material as may reasonably be required for verification.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "11.3",
                    "text": "Anayas Jewels may investigate any complaint before determining the appropriate response available under applicable law and these Terms. Submission of a complaint shall not amount to acceptance by Anayas Jewels that the Product is defective, damaged, deficient or otherwise non-conforming.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 12,
            "title": "PRODUCT CARE AND USAGE",
            "id": "care",
            "callout": false,
            "clauses": [
                {
                    "number": "12.1",
                    "text": "Artificial jewellery requires appropriate care to preserve its finish and appearance.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "12.2",
                    "text": "Unless otherwise specified, Products should be kept away from:",
                    "bullets": [
                        "a) water and prolonged moisture;",
                        "b) perfumes and deodorants;",
                        "c) creams, lotions and cosmetics;",
                        "d) sweat and excessive humidity;",
                        "e) chlorine and swimming pools;",
                        "f) detergents, sanitizers and cleaning chemicals;",
                        "g) direct contact with abrasive materials; and",
                        "h) prolonged exposure to heat, sunlight or improper storage conditions."
                    ],
                    "contact": []
                },
                {
                    "number": "12.3",
                    "text": "The Customer shall store Products separately in an air-tight container, in a clean and dry place, and shall avoid contact between jewellery pieces which may cause scratches or damage.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "12.4",
                    "text": "Normal wear and tear, tarnishing, oxidation, fading, scratches, plating deterioration, stone displacement or other deterioration caused by use, accident, mishandling, improper storage or exposure to external substances shall not constitute a manufacturing defect.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "12.5",
                    "text": "Unless expressly stated otherwise in writing, Anayas Jewels does not provide any representation that a Product is waterproof, sweat-proof, chemical-proof, hypoallergenic or permanently tarnish-proof.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 13,
            "title": "WARRANTIES AND REPRESENTATIONS",
            "callout": false,
            "clauses": [
                {
                    "number": "13.1",
                    "text": "Unless a specific written warranty is expressly provided with a Product, Products are sold without any additional warranty or guarantee. Any specific warranty, guarantee or assurance expressly provided for a particular Product shall apply only in accordance with its stated terms.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "13.2",
                    "text": "Any warranty, where applicable, shall not cover damage arising from misuse, accidental damage, improper handling, ordinary wear and tear, exposure to chemicals or moisture, unauthorised repair or alteration, or failure to follow care instructions.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 14,
            "title": "INTELLECTUAL PROPERTY RIGHTS",
            "callout": false,
            "clauses": [
                {
                    "number": "14.1",
                    "text": "All trademarks, logos, brand names, product names, photographs, product designs, graphics, text, videos, layouts, artwork, content and other intellectual property appearing on the Platform are owned by or lawfully licensed to Anayas Jewels or its respective owners.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "14.2",
                    "text": "No Customer shall reproduce, copy, modify, distribute, publish, transmit, commercially exploit, scrape, reverse engineer or otherwise use any such content without prior written permission.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "14.3",
                    "text": "Purchase of a Product does not transfer any intellectual property right in the Product design, branding, photograph, artwork or other proprietary material to the Customer.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "14.4",
                    "text": "Unauthorised use of Anayas Jewels's intellectual property may result in appropriate civil and/or criminal action in accordance with law.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 15,
            "title": "CUSTOMER ACCOUNTS AND RESPONSIBILITIES",
            "callout": false,
            "clauses": [
                {
                    "number": "15.1",
                    "text": "Where an account is created, the Customer shall maintain the confidentiality of login credentials and shall be responsible for activity undertaken through the account. The Customer shall immediately notify Anayas Jewels of any unauthorised use of the account or suspected security breach.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "15.2",
                    "text": "The Customer while creating an account shall not:",
                    "bullets": [
                        "a) provide false or misleading information;",
                        "b) impersonate another person;",
                        "c) use the Platform for unlawful purposes;",
                        "d) interfere with the security or functioning of the Platform;",
                        "e) introduce malware, viruses or destructive code;",
                        "f) scrape or systematically extract Platform data without authorisation;",
                        "g) attempt to gain unauthorised access to any account or system;",
                        "h) misuse promotional schemes or coupons; or",
                        "i) engage in abusive, threatening, fraudulent or unlawful conduct towards Anayas Jewels, its employees, representatives, vendors or delivery partners."
                    ],
                    "contact": []
                }
            ]
        },
        {
            "number": 16,
            "title": "FRAUD, MISUSE AND SUSPICIOUS TRANSACTIONS",
            "callout": false,
            "clauses": [
                {
                    "number": "16.1",
                    "text": "Anayas Jewels may investigate transactions which reasonably appear fraudulent, unauthorised, abusive or inconsistent with ordinary personal purchasing behaviour.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "16.2",
                    "text": "Where permitted by law, Anayas Jewels may refuse, suspend or cancel transactions, restrict accounts, withdraw promotional benefits or take other appropriate action where fraudulent or abusive conduct is detected.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "16.3",
                    "text": "Anayas Jewels reserves the right to cooperate with banks, payment gateways, logistics providers, law-enforcement authorities and other competent authorities in relation to suspected fraud or unlawful activity.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 17,
            "title": "PRIVACY POLICY",
            "id": "privacy",
            "callout": false,
            "clauses": [
                {
                    "number": "17.1",
                    "text": "Anayas Jewels respects the privacy of its Customers and undertakes to process personal information in accordance with applicable law and this Privacy Policy.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.2",
                    "text": "When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.3",
                    "text": "Personal information may be collected when the Customer:",
                    "bullets": [
                        "a) visits or uses the Platform;",
                        "b) creates an account;",
                        "c) places an Order;",
                        "d) makes a purchase;",
                        "e) contacts customer support;",
                        "f) participates in promotions, contests or campaigns; or",
                        "g) otherwise voluntarily provides information to Anayas Jewels."
                    ],
                    "contact": []
                },
                {
                    "number": "17.4",
                    "text": "The information collected by Anayas Jewels may include:",
                    "bullets": [
                        "a) name;",
                        "b) mobile number;",
                        "c) email address;",
                        "d) billing address;",
                        "e) shipping/delivery address;",
                        "f) payment and transaction-related information;",
                        "g) order history;",
                        "h) communications and customer-service interactions;",
                        "i) device and browser information;",
                        "j) IP address and technical information;",
                        "k) cookies and similar technical identifiers;",
                        "l) preferences and interactions with the Platform; and",
                        "m) such other information as may be reasonably necessary for providing the Products and Services."
                    ],
                    "contact": []
                },
                {
                    "number": "17.5",
                    "text": "Personal information may be used for:",
                    "bullets": [
                        "a) processing and fulfilling Orders;",
                        "b) payment verification and transaction processing;",
                        "c) delivery and logistics;",
                        "d) customer support;",
                        "e) issuing invoices and transaction records;",
                        "f) fraud prevention and security;",
                        "g) improving Products and services;",
                        "h) maintaining and administering the Platform;",
                        "i) complying with legal and regulatory obligations;",
                        "j) resolving disputes and enforcing contractual rights;",
                        "k) sending transactional communications; and",
                        "l) sending promotional or marketing communications."
                    ],
                    "contact": []
                },
                {
                    "number": "17.6",
                    "text": "Anayas Jewels may share necessary information with service providers and third parties engaged for legitimate business purposes, including payment processors, courier/logistics providers, hosting providers, technology service providers, analytics providers, customer-support providers, professional advisers and other vendors, subject to applicable law.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.7",
                    "text": "Personal information of the Customer may also be disclosed by Anayas Jewels where required by law, court order, governmental authority, regulatory requirement, fraud investigation or for protection of the rights, property or security of Anayas Jewels, its Customers or third parties.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.8",
                    "text": "Anayas Jewels does not sell or commercially disclose personal information to unrelated third parties for their independent marketing purposes except with the Customer's consent.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.9",
                    "text": "Anayas Jewels may use cookies, pixels, log files and similar technologies to operate, secure, analyse and improve the Platform, personalise content and understand user interaction. Disabling certain cookies may affect the functioning or availability of certain Platform features.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.10",
                    "text": "Anayas Jewels may retain personal information of the Customers for such period as reasonably necessary for the purposes for which it was collected, contractual requirements, legitimate business purposes and applicable legal, tax, accounting, regulatory or dispute-resolution requirements.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.11",
                    "text": "Anayas Jewels adopts reasonable security safeguards appropriate to the nature of the information processed, subject to the limitations inherent in electronic systems and internet communications.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.12",
                    "text": "The Customer shall provide accurate and lawful information and shall not knowingly provide information belonging to another person without lawful authority.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.13",
                    "text": "Subject to applicable law and its commencement from time to time, Customers may exercise applicable rights concerning access, correction, erasure, consent withdrawal and grievance redressal through the designated contact mechanism of Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.14",
                    "text": "We shall not be responsible for the authenticity of any of your personal information or sensitive personal data or information supplied by you.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "17.15",
                    "text": "Requests concerning personal data may be sent to:",
                    "bullets": [],
                    "contact": [
                        {
                            "label": "Privacy/Grievance Contact",
                            "value": "Mr. Sanil Sethi"
                        },
                        {
                            "label": "Email",
                            "value": "anayasjewels9@gmail.com",
                            "href": "mailto:anayasjewels9@gmail.com"
                        }
                    ]
                }
            ]
        },
        {
            "number": 18,
            "title": "COMMUNICATIONS",
            "callout": false,
            "clauses": [
                {
                    "number": "18.1",
                    "text": "By providing a mobile number, email address or other contact details, the Customer authorises Anayas Jewels to use such details for transaction-related communications, including order confirmations, payment information, dispatch notifications, delivery updates, customer support and other communications necessary for administering the transaction. Promotional communications shall be subject to applicable law and the Customer's applicable consent/preferences.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "18.2",
                    "text": "The Customer may opt out of non-essential promotional communications through the mechanism made available by Anayas Jewels, without affecting essential transactional communications.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 19,
            "title": "THIRD-PARTY SERVICES AND LINKS",
            "callout": false,
            "clauses": [
                {
                    "number": "19.1",
                    "text": "The Platform may use or provide access to third-party services, including payment gateways, courier services, hosting providers, analytics tools, social-media platforms and other service providers.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "19.2",
                    "text": "Third-party services may be governed by their own terms and privacy policies. Anayas Jewels shall not be responsible for independent acts, omissions, policies, outages or failures of third-party service providers. Links to third-party websites are provided for convenience. Anayas Jewels does not assume responsibility for the content, security or privacy practices of such third-party websites.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 20,
            "title": "USER CONTENT, FEEDBACK AND COMMUNICATIONS",
            "callout": false,
            "clauses": [
                {
                    "number": "20.1",
                    "text": "If a Customer voluntarily provides reviews, feedback, suggestions, photographs, comments or other content relating to Anayas Jewels or its Products, the Customer represents that such content is lawful and does not infringe the rights of any third party. The Customer shall not submit content which is unlawful, defamatory, abusive, obscene, threatening, fraudulent, misleading or infringing of intellectual property or privacy rights.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "20.2",
                    "text": "Subject to applicable law Anayas Jewels may use legitimate feedback and reviews for business, quality-improvement and promotional purposes. Anayas Jewels may also remove or refuse to publish content which violates these Terms or applicable law.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 21,
            "title": "MANUFACTURING DEFECTS AND LIMITATION OF LIABILITY",
            "callout": false,
            "clauses": [
                {
                    "number": "21.1",
                    "text": "Anayas acts solely as a retailer of the jewellery products sold through its platform and is not the manufacturer of such products. Accordingly, Anayas shall not be responsible or liable for any manufacturing defect, defect in workmanship, or defect arising from the materials used in the manufacture of any jewellery product, to the extent such defect is attributable to the manufacturer. Any claim relating to such manufacturing defects shall be subject to the applicable law and may be referred to the respective manufacturer, wherever applicable.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "21.2",
                    "text": "Subject to applicable laws, Anayas Jewels shall not be liable for indirect, incidental, special, punitive or consequential loss, loss of profits, loss of business, loss of opportunity, loss of data or other consequential damages arising from use of the Platform or Products.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "21.3",
                    "text": "Anayas Jewels shall not be responsible for delays, interruption or failure caused by circumstances beyond its reasonable control, including natural calamities, acts of God, war, riots, strikes, governmental restrictions, cyber incidents, telecommunications failures, internet outages, payment-system failures or logistics disruptions.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "21.4",
                    "text": "Subject to applicable law, the liability of Anayas Jewels in relation to any claim arising from a particular transaction shall not exceed the amount actually paid by the Customer for the Product giving rise to the claim.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 22,
            "title": "INDEMNIFICATION",
            "callout": false,
            "clauses": [
                {
                    "number": "",
                    "text": "Subject to applicable laws, the Customer shall indemnify and hold harmless Anayas Jewels, its proprietors, directors, officers, employees, representatives, agents and service providers against claims, losses, liabilities, costs and expenses arising from:",
                    "bullets": [
                        "a) breach of these Terms;",
                        "b) fraudulent or unlawful use of the Platform;",
                        "c) violation of any law or third-party rights;",
                        "d) misuse of the Products or Platform;",
                        "e) false, inaccurate or unauthorised information supplied by the Customer; or",
                        "f) infringement of intellectual property, privacy or other rights of any third party."
                    ],
                    "contact": []
                }
            ]
        },
        {
            "number": 23,
            "title": "FORCE MAJEURE",
            "callout": false,
            "clauses": [
                {
                    "number": "",
                    "text": "Anayas Jewels shall not be liable for any delay or failure in performing its obligations where such delay or failure results from circumstances beyond its reasonable control. Such circumstances may include natural disasters, fire, flood, epidemic/pandemic, war, civil disturbance, strikes, governmental restrictions, transportation disruption, supply-chain interruption, telecommunications failure, cyber incidents, payment-system failure, courier disruption or any other event which could not reasonably have been prevented or overcome.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 24,
            "title": "GRIEVANCE REDRESSAL",
            "id": "grievance",
            "callout": true,
            "clauses": [
                {
                    "number": "24.1",
                    "text": "Customers may raise transaction-related complaints or grievances by contacting:",
                    "bullets": [],
                    "contact": [
                        {
                            "label": "Contact Person",
                            "value": "Mr. Sanil Sethi"
                        },
                        {
                            "label": "Email",
                            "value": "anayasjewels9@gmail.com",
                            "href": "mailto:anayasjewels9@gmail.com"
                        },
                        {
                            "label": "Mobile/Customer Care",
                            "value": "9893020204",
                            "href": "tel:+919893020204"
                        }
                    ]
                },
                {
                    "number": "24.2",
                    "text": "The complaint should contain sufficient information, including Order/invoice number, Customer's name and contact details and the nature of the grievance.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 25,
            "title": "GOVERNING LAW",
            "callout": false,
            "clauses": [
                {
                    "number": "",
                    "text": "These Terms, all transactions conducted under them and the relationship between the Customer and Anayas Jewels shall be governed by and construed in accordance with the laws of India. The parties agree that disputes arising out of or relating to these Terms or any transaction with Anayas Jewels shall be subject to the jurisdiction of the competent courts at Indore, Madhya Pradesh exclusively. The parties hereby expressly submit to the exclusive jurisdiction of the competent courts at Indore, Madhya Pradesh.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 26,
            "title": "SEVERABILITY",
            "callout": false,
            "clauses": [
                {
                    "number": "",
                    "text": "If any provision of these Terms is held to be invalid, illegal or unenforceable by a competent authority, such provision shall be enforced to the maximum extent permissible and the remaining provisions shall continue in full force and effect. The invalidity or unenforceability of any provision shall not affect the validity of the remaining provisions.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 27,
            "title": "NO WAIVER",
            "callout": false,
            "clauses": [
                {
                    "number": "",
                    "text": "Failure or delay by Anayas Jewels in enforcing any provision of these Terms shall not constitute a waiver of that provision or of any other right. Any waiver shall be effective only if expressly made in writing by an authorised representative of Anayas Jewels.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 28,
            "title": "ENTIRE AGREEMENT",
            "callout": false,
            "clauses": [
                {
                    "number": "",
                    "text": "These Terms, together with the applicable Product description, invoice, Order confirmation, specific promotional conditions and policies expressly incorporated herein, constitute the complete understanding governing the relevant transaction.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 29,
            "title": "ELECTRONIC ACCEPTANCE",
            "callout": false,
            "clauses": [
                {
                    "number": "29.1",
                    "text": "The Customer acknowledges that clicking \"I Agree\", \"Place Order\", \"Buy Now\", \"Proceed to Payment\" or any substantially similar button, placing an Order, making payment, accepting delivery or purchasing a Product shall constitute valid electronic acceptance of these Terms.",
                    "bullets": [],
                    "contact": []
                },
                {
                    "number": "29.2",
                    "text": "The Customer agrees that electronic records of Orders, invoices, payments, communications and acceptance may be relied upon as evidence of the relevant transaction.",
                    "bullets": [],
                    "contact": []
                }
            ]
        },
        {
            "number": 30,
            "title": "CUSTOMER ACKNOWLEDGEMENT",
            "callout": false,
            "clauses": [
                {
                    "number": "",
                    "text": "By placing an Order or purchasing any Product from Anayas Jewels, the Customer expressly acknowledges and confirms that:",
                    "bullets": [
                        "a) the Customer has read and understood these Terms;",
                        "b) the Customer has independently examined the Product description, price, applicable taxes and delivery charges before purchase;",
                        "c) the Customer understands that the Products are artificial/fashion jewellery unless expressly stated otherwise;",
                        "d) the Customer understands that artificial jewellery may be affected by use, moisture, sweat, chemicals, perfumes, cosmetics and other external factors;",
                        "e) the Customer understands and accepts that all sales are final and that Anayas Jewels does not provide any general return, refund or exchange facility after sale;",
                        "f) the Customer understands that delivery/shipping and applicable taxes and charges shall be payable by the Customer wherever applicable; and",
                        "g) the Customer agrees to be bound by these Terms."
                    ],
                    "contact": []
                }
            ]
        }
    ]
};
