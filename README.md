Hexorator.js
===
Hexorator is a jQuery plugin that allows you to group text tags by similar hex value. Using a base color, hexorator will generate series of similar Hex values and assign these Hex values, unqiuely, to each text tag.

<h3>Setting Up</h3>

```javascript 

   //html
   <ul>
      <li class="tag">Eagles</li>
      <li class="tag">Patriots</li>
      <li class="tag">Giants</li>
      <li class="tag">Eagles</li>
      <li class="tag">Ravens</li>
      <li class="tag">Patriots</li>
   </ul>
   
   /*The selector is the tag class. Hexorator will assign each unqiue tag with a unique background color
   For example, both "Eagles" tags will be assigned the same background color.*/
   $(".tag").hexorator()
   
   //Base colors range from 1 to 16, representing all Hex Pairs (10-16 = A - F)
   //The higher the base color the light the tags will be
   $(".tag").hexorator({baseColor:13})
   
```
