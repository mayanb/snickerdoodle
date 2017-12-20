export const data = [
  {
      "id": 2341,
      "process_type": {
          "id": 27,
          "name": "Roast",
          "code": "R",
          "icon": "roast.png",
          "attributes": [
              {
                  "id": 86,
                  "process_type": 27,
                  "name": "Operator",
                  "rank": 0,
                  "datatype": "TEXT"
              },
              {
                  "id": 87,
                  "process_type": 27,
                  "name": "Flavor Sign-Off",
                  "rank": 1,
                  "datatype": "TEXT"
              },
              {
                  "id": 88,
                  "process_type": 27,
                  "name": "Notes",
                  "rank": 2,
                  "datatype": "TEXT"
              }
          ],
          "unit": "kg",
          "x": "1.390",
          "y": "33.650",
          "created_by": 5,
          "output_desc": "Roasted Beans",
          "created_by_name": "wizards_valencia",
          "default_amount": "5.000",
          "team_created_by": 2,
          "team_created_by_name": "valencia",
          "is_trashed": false
      },
      "product_type": {
          "id": 28,
          "name": "Maya Mountain 2015",
          "code": "MM15",
          "created_by": 5,
          "is_trashed": false,
          "team_created_by": 2
      },
      "label": "R-MM 15-0510",
      "is_open": false,
      "is_flagged": true,
      "flag_update_time": "2017-12-11T03:55:54.891506Z",
      "created_at": "2017-05-10T23:10:07.922180Z",
      "updated_at": "2017-12-11T03:55:54.891726Z",
      "label_index": 3,
      "custom_display": "",
      "items": [
          {
              "id": 14421,
              "item_qr": "dande.li/ics/4c206d5f-0087-44e5-a39e-81e67405a159",
              "creating_task": 2341,
              "inventory": 5,
              "amount": "5.000",
              "is_virtual": false,
              "team_inventory": 2
          }
      ],
      "inputs": [
          {
              "id": 5721,
              "input_item": 11679,
              "task": 2341,
              "input_task": "1696",
              "input_task_display": "B-MM-0425",
              "input_qr": "dande.li/ics/69d82b72-6252-4131-bc38-c55a20bafb0c",
              "input_task_n": {
                  "id": 1696,
                  "is_open": false,
                  "custom_display": "B-MM-0425",
                  "is_trashed": false,
                  "is_flagged": false,
                  "flag_update_time": "2017-01-01T00:00:00Z",
                  "display": "B-MM-0425",
                  "process_type": 26,
                  "product_type": 28,
                  "created_at": "2017-04-26T23:48:27.242203Z",
                  "search": "'-0':32 '0425':13,23,35 '0426':9,27,31,38 '092003':43 '113e69':48 '2015':5 '379c6b':44 '613423':45 'afc675':47 'b':7,11,14,21,25,29,33,36 'b-mm':6,10,20,24,28 'b48546':50 'bafb0c':42 'bag':1,15 'bc5ce0':46 'cd1a57':51 'f2b3c2':49 'intake':2 'kaija':39,40 'labeling':16 'maya':3,18 'mm':8,12,17,22,26,30,34,37 'mountain':4,19 'wizards':41"
              },
              "input_item_virtual": false,
              "input_item_amount": "1.000"
          }
      ],
      "attribute_values": [
          {
              "id": 4707,
              "attribute": 86,
              "task": 2341,
              "value": "Obed L.",
              "att_name": "Operator",
              "datatype": "TEXT"
          },
          {
              "id": 4708,
              "attribute": 87,
              "task": 2341,
              "value": "Obed L.",
              "att_name": "Flavor Sign-Off",
              "datatype": "TEXT"
          }
      ],
      "display": "R-MM 15-0510-3",
      "is_trashed": false,
      "search": "'-0510':9,20,25 '-3':26 '0510':30 '05a159':38,39 '15':8,19,24,29 '2015':4,15 'l':32,34,36 'maya':2,13 'mm':7,18,23,28 'mm15':12 'mountain':3,14 'obe':31,33,35 'r':6,10,17,22,27 'r-mm':5,16,21 'roast':1,11 'valencia':37"
  }
]