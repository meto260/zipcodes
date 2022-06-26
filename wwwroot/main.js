let loc = window.location.href;
window.onload = function(){
    suggestion.innerText= loc + "q?country=<country>" +
    "&zip=<zip>"+
    "&nbhood=<nbhood>" +
    "&city=<city>"+
    "&dist=<dist>"
}
const { createApp } = Vue;
createApp({
    data() {
        return { 
            data: 0 ,
            query : {}
        };
    },
    methods: {
        async onsearchSubmit() {
            let queryable = loc + "q?";
            let i=0;
            for (const [key, value] of Object.entries(this.query)) {
                if(i>0) queryable += "&";
                queryable +=`${key}=${value}`;
                i++;
            }
            let models = await fetch(queryable);
            var founds = await models.json();
            this.data = founds.data;
        },
        keyupText(event){
            this.query[event.target.name] = event.target.value;
        }
    },
    template: `
        <table>
            <tr>
                <th>
                    <input type='text' placeholder="Country" name='country' @keyup='keyupText' @keyup.enter='onsearchSubmit' />
                </th>
                <th>
                    <input type='text' placeholder="ZipCode" name='zip' @keyup='keyupText' @keyup.enter='onsearchSubmit'  />
                </th>
                <th>
                    <input type='text' placeholder="City" name='city' @keyup='keyupText' @keyup.enter='onsearchSubmit'  />
                </th>
                <th>
                    <input type='text' placeholder="District" name='dist' @keyup='keyupText' @keyup.enter='onsearchSubmit'  />
                </th>
                <th>
                    <input type='text' placeholder="Place" name='nbhood' @keyup='keyupText' @keyup.enter='onsearchSubmit'  />
                </th>
                <th colspan="2">
                    <p id="suggestion"></p>
                </th>
            </tr>
            <tr>
                <th>Country</th>
                <th>ZipCode</th>
                <th>City</th>
                <th>District</th>
                <th>Place</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
            <tr v-for="datum in data" v-if="typeof data == typeof []" class="hovertr">
                <td>{{datum.countrycode}}</td>
                <td>{{datum.postalcode}}</td>
                <td>{{datum.city}}</td>
                <td>{{datum.ilce}}</td>
                <td>{{datum.mahalle}}</td>
                <td>{{datum.latitude}}</td>
                <td>{{datum.longitude}}</td>
            <tr>
        </table>
      `

}).mount('#app')