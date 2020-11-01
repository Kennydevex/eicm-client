import { find } from "lodash";

export const nacional_states = {
         data() {
           return {
             states: [
               {
                 id: "sv",
                 name: "São Vicente",
                 counties: [
                   {
                     id: "csv",
                     name: "São Vicente",
                     parishes: [
                       {
                         id: "fnsl",
                         name: "Nossa Senhora da Luz",
                         zones: [
                           { id: "bv", name: "Bela Vista" },
                           { id: "rb", name: "Ribeira Bote" },
                           { id: "rb", name: "Ribeira Bote" },
                           { id: "md", name: "Madeiral" },
                           { id: "mdz", name: "Madeiralzinho" },
                           { id: "vn", name: "Vila Nova" },
                           { id: "rbr", name: "Ribeirinha" },
                           { id: "ca", name: "Chã D'Alecrim" },
                           { id: "lgn", name: "Laginha" },
                           { id: "af", name: "Alto Fortin" },
                           { id: "asn", name: "Alto são Nicolau" },
                           { id: "mrd", name: "Morada" },
                           { id: "asn", name: "Alto Sentina" },
                           { id: "asl", name: "Alto Salarino" },
                           { id: "sp", name: "São Pedro" },
                           { id: "amm", name: "Alto Mira Mar" },
                           { id: "ffn", name: "Fonte Francês" },
                           { id: "ffi", name: "Fonte Inês" },
                           { id: "ffl", name: "Fonte Felipe" },
                           { id: "cv", name: "Crúz" },
                           { id: "esp", name: "Espía" },
                           { id: "dds", name: "Dja D'Sal" },
                           { id: "crq", name: "Craquinha" },
                           { id: "msg", name: "Monte Sossego" },
                           { id: "cpn", name: "Campin" },
                           { id: "fp", name: "Fernando Pó" },
                           { id: "ba", name: "Baia" },
                           { id: "jd", name: "João Debra" },
                           { id: "slm", name: "Salamansa" },
                           { id: "nb", name: "Norte Baia" },
                           { id: "ca", name: "Calhau" }
                         ]
                       }
                     ]
                   }
                 ]
               },
               {
                 id: "st",
                 name: "Santo Antão",
                 counties: [
                   {
                     id: "cpn",
                     name: "Porto Novo",
                     parishes: [
                       {
                         id: "fpn",
                         name: "Nossa Senhora do Porto Novo",
                         zones: [
                           { id: "bv", name: "Lambada" },
                           { id: "rb", name: "Novo Porto" }
                         ]
                       }
                     ]
                   }
                 ]
               }
             ]
           };
         },
         computed: {
           selectedState() {
             let mthis = this;
             if (this.formData.location.state) {
               return find(this.states, function(o) {
                 return o.name == mthis.formData.location.state;
               });
             }
             return;
           },

           selectedCounty() {
             let mthis = this;
             if (this.formData.location.county) {
               return find(this.selectedState.counties, function(o) {
                 return o.name == mthis.formData.location.county;
               });
             }
             return;
           },

           selectedParish() {
             let mthis = this;
             if (this.formData.location.parish) {
               return find(this.selectedCounty.parishes, function(o) {
                 return o.name == mthis.formData.location.parish;
               });
             }
             return;
           },

           counties() {
             return this.selectedState ? this.selectedState.counties : [];
           },

           parishes() {
             return this.selectedCounty ? this.selectedCounty.parishes : [];
           },

            zones() {
             return this.selectedParish ? this.selectedParish.zones : [];
           },

            cities() {
             return this.selectedParish ? this.selectedParish.cities : [];
           }

           // selectedCity() {
           //   let mthis = this;
           //   if (this.formData.location.city) {
           //     return find(this.selectedState.city, function(o) {
           //       return o.name == mthis.formData.location.city;
           //     });
           //   }
           //   return;
           // }
         },

         methods: {
           clearLocationDataFrom(from) {
             if (from === "state") {
               this.formData.location.county = "";
               this.formData.location.parish = "";
               this.formData.location.zone = "";
               return;
             }
             if (from === "county") {
               this.formData.location.parish = "";
               this.formData.location.zone = "";
               return;
             }
             if (from === "parish") {
               this.formData.location.zone = "";
               return;
             }
             return;
           }
         }
       };
