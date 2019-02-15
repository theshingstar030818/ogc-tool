import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {

  users = [
    {
      name: 'OGC President: Fares Elsabbagh',
      phone: '613-225-9991 Ext: 202',
      email: 'fares@ottawageneralcontractors.com',
    },
    {
      name: 'General Manager: Bryan Sim',
      phone: '613-225-9991 Ext: 213',
      email: 'bryan@ottawageneralcontractors.com',
    },
    {
      name: 'Project Coordinator: Nick Karrandjas',
      phone: '613-225-9991 Ext: 103,  or Cell: 613-806-3172',
      email: 'nick@ottawageneralcontractors.com',
    },
    {
      name: 'Project Coordinator: Karley Harrington',
      phone: '613-225-9991 Ext: 825',
      email: 'karley@ottawageneralcontractors.com',
    },
    {
      name: 'Project Coordinator: Ken Beaubien',
      phone: '613-225-9991 Ext: 104',
      email: 'ken.b@ottawageneralcontractors.com',
    },
    {
      name: 'Estimator: Khaled Hamouda',
      phone: '613-225-9991 Ext: 206',
      email: 'khaled@ottawageneralcontractors.com',
    },
    {
      name: 'Project Manager: Andrew Jabbour',
      phone: '613-225-9991 Ext: 108',
      email: 'andrew@ottawageneralcontractors.com',
    },
    {
      name: 'Project Manager: Bradley Newsham',
      phone: '613-225-9991 Ext: 805',
      email: 'bradley@ottawageneralcontractors.com',
    },
    {
      name: 'Project Manager: Allan Orasuk',
      phone: '613-225-9991 Ext: 106',
      email: 'allan@ottawageneralcontractors.com',
    },
    {
      name: 'Project Manager: Natalia Pierce',
      phone: '613-225-9991 Ext: 815',
      email: 'Natalia@ottawageneralcontractors.com',
    },
    {
      name: 'Project Manager: Paolo Marinelli',
      phone: '613-225-9991 Ext: 811',
      email: 'paolo@ottawageneralcontractors.com',
    },
    {
      name: 'Design Manager: James Walker',
      phone: '613-225-9991 Ext: 109',
      email: 'james.walker@ottawageneralcontractors.com',
    },
    {
      name: 'Designer: Matt Griffiths',
      phone: '613-225-9991 Ext: 102',
      email: 'matt@ottawageneralcontractors.com',
    },
    {
      name: 'Material Selection: Tanveen Kaur',
      phone: '613-225-9991 Ext: 307',
      email: 'tanveen@ottawageneralcontractors.com',
    },
    {
      name: 'Material Selection: Deirdre Crick',
      phone: '613-225-9991 Ext: 112',
      email: 'deirdre@ottawageneralcontractors.com',
    },
  ];

  divisions = [
    {
      name: '1. General Requirements',
      subDivisions: [
        {
          name: 'Plans And Permits',
          lineItems: [
            {
              title: 'Design',
              unitType: 'lot',
              material: 0,
              qty: 0,
              trade: 'Dsgn -',
              description: 'Provide design drawings that meet with the approval of the client.',
              ogcNotes: '',
              tax: 1.13,
              total: 1.00,
              clientTotal: 0.00,
              notes: '',
              allowance: '',
              value: 0,
            },
            {
              title: 'Design Credit',
              unitType: 'credit',
              material: 0,
              qty: 0,
              trade: '',
              description: 'Provide design credit, equal to the design fee.',
              ogcNotes: '',
              tax: 1.13,
              total: 1.00,
              clientTotal: 0.00,
              notes: '',
              allowance: '',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      name: '2. Site Work',
      subDivisions: [
        {
          name: 'Site Pre-Construction Work',
          lineItems: [
            {
              title: 'Site Access Assessment',
              unitType: 'lot',
              material: 0,
              qty: 0,
              trade: 'OGC -',
              description: `If the construction site is difficult
              to access for contractors, or subtrade equipment,
              there may be an additional charge for site access.`,
              ogcNotes: '',
              tax: 1.13,
              total: 1.00,
              clientTotal: 0.00,
              notes: '',
              allowance: '',
              value: 0,
            },
            {
              title: 'Job Site Security',
              unitType: 'day',
              material: 0,
              qty: 0,
              trade: 'Other -',
              description: `Provide job site security officer,
              to ensure against trespassers during non working hours.`,
              ogcNotes: '',
              tax: 1.13,
              total: 1.00,
              clientTotal: 0.00,
              notes: '',
              allowance: '',
              value: 0,
            },
          ],
        },
        {
          name: 'Waste bins',
          lineItems: [
            {
              title: '20 CY Waste Bin',
              unitType: 'ea',
              material: 0,
              qty: 0,
              trade: 'OGC -',
              description: `Provide 20 CY or 14 CY bin for masonry and concrete construction debris.
               Additional charges may apply if bin type or usage become outside of the expectation noted here.`,
              ogcNotes: '',
              tax: 1.13,
              total: 1.00,
              clientTotal: 0.00,
              notes: '',
              allowance: '',
              value: 0,
            },
            {
              title: '30 CY Solid Waste Bin',
              unitType: 'ea',
              material: 0,
              qty: 0,
              trade: 'OGC -',
              description: `Provide 30 CY bin for construction debris.
              Additional charges may apply if bin type or usage become outside of the expectation noted here.`,
              ogcNotes: '',
              tax: 1.13,
              total: 1.00,
              clientTotal: 0.00,
              notes: '',
              allowance: '',
              value: 0,
            },
          ],
        },
      ],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
  ) {
    this.route.parent.params.subscribe( params => {
      // console.log(params);
    });
  }

  ngOnInit() {
  }

}
