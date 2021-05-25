!function(){"use strict";function e(e,r){return{createExportConfigFromHeaderKeys:function(e){var r={};return _.forEach(e,(function(e){r[e]=[]})),r},createExportLabels:function(e){return{date:e.date,hour:e.stepHour,utc:e.utc,grt:e.grt,upwardVolume:e.volumeUp,maximumUpwardPrice:e.maxPriceUp,minimumUpwardPrice:e.minPriceUp,downwardVolume:e.volumeDown,maximumDownwardPrice:e.maxPriceDown,minimumDownwardPrice:e.minPriceDown}},arrangeDataExport:function(e,m,t){var n=[];t.id!==r.GRT_ALL&&t.id!==r.GRT_NG||_.forEach(e[r.GRT_NG],(function(e){n.push(a(e,r.GRT_NG))}));t.id!==r.GRT_ALL&&t.id!==r.GRT_REE||_.forEach(e[r.GRT_REE],(function(e){n.push(a(e,r.GRT_REE))}));return _.sortBy(n,"hour")},arrangeDataTable:function(e,a,n){var u=[];_.forEach(e[r.GRT_NG],(function(e){u[e.startDate]=_.isUndefined(u[e.startDate])?{}:u[e.startDate],u[e.startDate].hour=t(e.startDate),u[e.startDate].grtNg=a.ng,u[e.startDate].upwardVolumeNg=m(e.upwardVolume,a.mw,n),u[e.startDate].maximumUpwardPriceNg=m(e.maximumUpwardPrice,a.euros,n),u[e.startDate].minimumUpwardPriceNg=m(e.minimumUpwardPrice,a.euros,n),u[e.startDate].downwardVolumeNg=m(e.downwardVolume,a.mw,n),u[e.startDate].maximumDownwardPriceNg=m(e.maximumDownwardPrice,a.euros,n),u[e.startDate].minimumDownwardPriceNg=m(e.minimumDownwardPrice,a.euros,n)})),_.forEach(e[r.GRT_REE],(function(e){u[e.startDate]=_.isUndefined(u[e.startDate])?{}:u[e.startDate],u[e.startDate].hour=t(e.startDate),u[e.startDate].grtRee=a.ree,u[e.startDate].upwardVolumeRee=m(e.upwardVolume,a.mw,n),u[e.startDate].maximumUpwardPriceRee=m(e.maximumUpwardPrice,a.euros,n),u[e.startDate].minimumUpwardPriceRee=m(e.minimumUpwardPrice,a.euros,n),u[e.startDate].downwardVolumeRee=m(e.downwardVolume,a.mw,n),u[e.startDate].maximumDownwardPriceRee=m(e.maximumDownwardPrice,a.euros,n),u[e.startDate].minimumDownwardPriceRee=m(e.minimumDownwardPrice,a.euros,n)}));var i=_.values(u);return _.sortBy(i,"hour")},convertDataToTableArray:function(a,m,t){var n=[];return _.forEach(a,(function(a){!function(a,m,t,n){var u=[];(n.id===r.GRT_ALL||function(e,a){return e===r.GRT_NG&&!_.isUndefined(a.grtNg)||e===r.GRT_REE&&!_.isUndefined(a.grtRee)}(n.id,a))&&u.push(new e.TableItem(!0,!1,"",a.hour,""));_.isUndefined(a.grtNg)||n.id!==r.GRT_ALL&&n.id!==r.GRT_NG||(u.push(new e.TableItem(!1,!0,"",a.grtNg,"")),u.push(new e.TableItemRoundedValue(m.volume,a.upwardVolumeNg,m.up)),u.push(new e.TableItemRoundedValue(m.maxPrice,a.maximumUpwardPriceNg,m.up)),u.push(new e.TableItemRoundedValue(m.minPrice,a.minimumUpwardPriceNg,m.up)),u.push(new e.TableItemRoundedValue(m.volume,a.downwardVolumeNg,m.down)),u.push(new e.TableItemRoundedValue(m.maxPrice,a.maximumDownwardPriceNg,m.down)),u.push(new e.TableItemRoundedValue(m.minPrice,a.minimumDownwardPriceNg,m.down)));_.isUndefined(a.grtRee)||n.id!==r.GRT_ALL&&n.id!==r.GRT_REE||(u.push(new e.TableItem(!1,!0,"",a.grtRee,"")),u.push(new e.TableItemRoundedValue(m.volume,a.upwardVolumeRee,m.up)),u.push(new e.TableItemRoundedValue(m.maxPrice,a.maximumUpwardPriceRee,m.up)),u.push(new e.TableItemRoundedValue(m.minPrice,a.minimumUpwardPriceRee,m.up)),u.push(new e.TableItemRoundedValue(m.volume,a.downwardVolumeRee,m.down)),u.push(new e.TableItemRoundedValue(m.maxPrice,a.maximumDownwardPriceRee,m.down)),u.push(new e.TableItemRoundedValue(m.minPrice,a.minimumDownwardPriceRee,m.down)));t.push(u)}(a,m,n,t)})),n},createGrtList:function(e){return[{id:r.GRT_ALL,name:e.all},{id:r.GRT_NG,name:e.ng},{id:r.GRT_REE,name:e.ree}]}};function a(e,r){return{date:moment(e.startDate).format("DD/MM/YYYY"),hour:t(e.startDate),utc:moment(e.startDate).format("UTC Z"),grt:r,upwardVolume:e.upwardVolume,maximumUpwardPrice:e.maximumUpwardPrice,minimumUpwardPrice:e.minimumUpwardPrice,downwardVolume:e.downwardVolume,maximumDownwardPrice:e.maximumDownwardPrice,minimumDownwardPrice:e.minimumDownwardPrice}}function m(e,r,a){return _.isUndefined(e)?"-":e.toLocaleString(a)+" "+r}function t(e){var r="";return _.isUndefined(e)||(r=moment(e).format("HH:mm")+" - "+moment(e).add(1,"h").format("HH:mm")),r}}angular.module("cortex").service("balancingEnergyOffersGrtService",e),e.$inject=["cardTableService","BALANCING_ENERGY_OFFERS_GRT"]}();