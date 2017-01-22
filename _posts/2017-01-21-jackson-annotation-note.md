---
layout: post
title: "Jackson Annotation Note"
date: "2017-01-21 21:14:55 +0800"
tag: ["JSON", "Jackson"]
image_preview: /images/2017-01-21-jackson-annotation-note/json.gif
---

> Based on the [article: Jackson Annotation Examples](http://www.baeldung.com/jackson-annotations) by Eugen Paraschiv

> 最近在搞Dropwizard, 意外发现了这个[Jackson JSON Processor](https://github.com/FasterXML/jackson), 支持注脚, 非常好用, 官方Wiki关于此写的并不详细, 在次转来一篇Example, 浅显易懂便不作翻译.

## Overview

In this article, we\'ll do a deep dive into __Jackson Annotations__.

We\'ll see how to use the existing annotations, how to create custom ones and finally – how to disable them.

## Jackson Serialization Annotations

First – let\'s take a look at the serialization annotations.

### ```@JsonAnyGetter```

The ```@JsonAnyGetter``` annotation allows the flexibility of using a Map field as standard properties.

Here\'s a quick example – the ExtendableBean entity has the name property and a set of extendable attributes in form of key/value pairs:

``` java
public class ExtendableBean {
    public String name;
    private Map<String, String> properties;

    @JsonAnyGetter
    public Map<String, String> getProperties() {
        return properties;
    }
}
```

When we serialize an instance of this entity, we get all the key-values in the Map as standard, plain properties:

``` json
{
    "name":"My bean",
    "attr2":"val2",
    "attr1":"val1"
}
```

And here how the serialization of this entity looks like in practice:

``` java
@Test
public void whenSerializingUsingJsonAnyGetter_thenCorrect()
  throws JsonProcessingException {

    ExtendableBean bean = new ExtendableBean("My bean");
    bean.add("attr1", "val1");
    bean.add("attr2", "val2");

    String result = new ObjectMapper().writeValueAsString(bean);

    assertThat(result, containsString("attr1"));
    assertThat(result, containsString("val1"));
}
```

### ```@JsonGetter```

The ```@JsonGetter``` annotation is an alternative to ```@JsonProperty``` annotation to mark the specified method as a getter method.

In the following example – we specify the method getTheName() as the getter method of name property of MyBean entity:

``` java
public class MyBean {
    public int id;
    private String name;

    @JsonGetter("name")
    public String getTheName() {
        return name;
    }
}
```

And here\'s how this works in practice:

``` java
@Test
public void whenSerializingUsingJsonGetter_thenCorrect()
  throws JsonProcessingException {

    MyBean bean = new MyBean(1, "My bean");

    String result = new ObjectMapper().writeValueAsString(bean);

    assertThat(result, containsString("My bean"));
    assertThat(result, containsString("1"));
}
```

### ```@JsonPropertyOrder```

The ```@JsonPropertyOrder``` annotation is used to specify __the order of properties on serialization__.

Let\'s set a custom order for the properties of a MyBean entity:

``` java
@JsonPropertyOrder({ "name", "id" })
public class MyBean {
    public int id;
    public String name;
}
```

And here is the output of serialization:

``` json
{
    "name":"My bean",
    "id":1
}
```

And a simple test:

``` java
@Test
public void whenSerializingUsingJsonPropertyOrder_thenCorrect()
  throws JsonProcessingException {

    MyBean bean = new MyBean(1, "My bean");

    String result = new ObjectMapper().writeValueAsString(bean);
    assertThat(result, containsString("My bean"));
    assertThat(result, containsString("1"));
}
```

### ```@JsonRawValue```

```@JsonRawValue``` is used to instruct the Jackson to serialize a property exactly as is.

In the following example – we use ```@JsonRawValue``` to embed some custom JSON as a value of an entity:

``` java
public class RawBean {
    public String name;

    @JsonRawValue
    public String json;
}
```

The output of serializing the entity is:

``` json
{
    "name":"My bean",
    "json":{
        "attr":false
    }
}
```

And a simple test:

``` java
@Test
public void whenSerializingUsingJsonRawValue_thenCorrect()
  throws JsonProcessingException {

    RawBean bean = new RawBean("My bean", "{"attr":false}");

    String result = new ObjectMapper().writeValueAsString(bean);
    assertThat(result, containsString("My bean"));
    assertThat(result, containsString("{"attr":false}"));
}
```

### ```@JsonValue```

```@JsonValue``` indicates a single method that should be used to serialize the entire instance.

For example in an enum – we annotate the getName with ```@JsonValue``` so that any such entity is serialized via its name:

``` java
public enum TypeEnumWithValue {
    TYPE1(1, "Type A"), TYPE2(2, "Type 2");

    private Integer id;
    private String name;

    @JsonValue
    public String getName() {
        return name;
    }
}
```

Our test:

``` java
@Test
public void whenSerializingUsingJsonValue_thenCorrect()
  throws JsonParseException, IOException {

    String enumAsString
      = new ObjectMapper().writeValueAsString(TypeEnumWithValue.TYPE1);

    assertThat(enumAsString, is(""Type A""));
}
```

### ```@JsonRootName```

The ```@JsonRootName``` annotation is used – if wrapping is enabled – to specify the name of the root wrapper to be used.

Wrapping means that instead of serializing a User to something like:

``` json
{
    "id": 1,
    "name": "John"
}
```
It\'s going to be wrapped like this:


``` json
{
    "User": {
        "id": 1,
        "name": "John"
    }
}
```

So, let\'s look at an example – we\'re going to use the ```@JsonRootName``` annotation to indicate the name of this potential wrapper entity:


``` java
@JsonRootName(value = "user")
public class UserWithRoot {
    public int id;
    public String name;
}
```

By default, the name of the wrapper would be the name of the class – UserWithRoot. By using the annotation, we get the cleaner-looking user:


``` java
@Test
public void whenSerializingUsingJsonRootName_thenCorrect()
  throws JsonProcessingException {

    UserWithRoot user = new User(1, "John");

    ObjectMapper mapper = new ObjectMapper();
    mapper.enable(SerializationFeature.WRAP_ROOT_VALUE);
    String result = mapper.writeValueAsString(user);

    assertThat(result, containsString("John"));
    assertThat(result, containsString("user"));
}
```

Here is the output of serialization:


``` json
{
    "user":{
        "id":1,
        "name":"John"
    }
}
```

### ```@JsonSerialize```

```@JsonSerialize``` is used to indicate a custom serializer will be used to marshall the entity.

Let\'s look at a quick example – we\'re going to use ```@JsonSerialize``` to serialize the eventDate property with a CustomDateSerializer:


``` java
public class Event {
    public String name;

    @JsonSerialize(using = CustomDateSerializer.class)
    public Date eventDate;
}
```

Here\'s the simple custom Jackson serializer:


``` java
public class CustomDateSerializer extends StdSerializer<Date> {

    private static SimpleDateFormat formatter
      = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");

    public CustomDateSerializer() {
        this(null);
    }

    public CustomDateSerializer(Class<Date> t) {
        super(t);
    }

    @Override
    public void serialize(
      Date value, JsonGenerator gen, SerializerProvider arg2)
      throws IOException, JsonProcessingException {
        gen.writeString(formatter.format(value));
    }
}
```

Let\'s use these in a test:


``` java
@Test
public void whenSerializingUsingJsonSerialize_thenCorrect()
  throws JsonProcessingException, ParseException {

    SimpleDateFormat df
      = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");

    String toParse = "20-12-2014 02:30:00";
    Date date = df.parse(toParse);
    Event event = new Event("party", date);

    String result = new ObjectMapper().writeValueAsString(event);
    assertThat(result, containsString(toParse));
}
```

## Jackson Deserialization Annotations

Next – let\'s explore the Jackson deserialization annotations.

### ```@JsonCreator```

The ```@JsonCreator``` annotation is used to tune the constructor/factory used in deserialization.

It\'s very helpful when we need to deserialize some JSON that doesn\'t exactly match the target entity we need to get.

Let\'s look at an example; say we need to deserialize the following JSON:


``` json
{
    "id":1,
    "theName":"My bean"
}
```

However, there is no theName field in our target entity – there is only a name field. Now – we don\'t want to change the entity itself – we just need a little more control over the unmarshalling process – by annotating the constructor with ```@JsonCreator``` and using the ```@JsonProperty``` annotation as well:


``` java
public class BeanWithCreator {
    public int id;
    public String name;

    @JsonCreator
    public BeanWithCreator(
      @JsonProperty("id") int id,
      @JsonProperty("theName") String name) {
        this.id = id;
        this.name = name;
    }
}
```

Let\'s see this in action:


``` java
@Test
public void whenDeserializingUsingJsonCreator_thenCorrect()
  throws IOException {

    String json = "{\"id\":1,\"theName\":\"My bean\"}";

    BeanWithCreator bean = new ObjectMapper()
      .readerFor(BeanWithCreator.class)
      .readValue(json);
    assertEquals("My bean", bean.name);
}
```

### ```@JacksonInject```

```@JacksonInject``` is used to indicate a property that will get its value from the injection and not from the JSON data.

In the following example – we use ```@JacksonInject``` to inject the property id:


``` java
public class BeanWithInject {
    @JacksonInject
    public int id;

    public String name;
}
```

And here\'s how this works:


``` java
@Test
public void whenDeserializingUsingJsonInject_thenCorrect()
  throws IOException {

    String json = "{\"name\":\"My bean\"}";

    InjectableValues inject = new InjectableValues.Std()
      .addValue(int.class, 1);
    BeanWithInject bean = new ObjectMapper().reader(inject)
      .forType(BeanWithInject.class)
      .readValue(json);

    assertEquals("My bean", bean.name);
    assertEquals(1, bean.id);
}
```

### ```@JsonAnySetter```

```@JsonAnySetter``` allows you the flexibility of using a Map as standard properties. On de-serialization, the properties from JSON will simply be added to the map.

Let\'s see how this works – we\'ll use ```@JsonAnySetter``` to deserialize the entity ExtendableBean:


``` java
public class ExtendableBean {
    public String name;
    private Map<String, String> properties;

    @JsonAnySetter
    public void add(String key, String value) {
        properties.put(key, value);
    }
}
```

This is the JSON we need to deserialize:


``` json
{
    "name":"My bean",
    "attr2":"val2",
    "attr1":"val1"
}
```

And here\'s how this all ties in together:


``` java
@Test
public void whenDeserializingUsingJsonAnySetter_thenCorrect()
  throws IOException {
    String json
      = "{\"name\":\"My bean\",\"attr2\":\"val2\",\"attr1\":\"val1\"}";

    ExtendableBean bean = new ObjectMapper()
      .readerFor(ExtendableBean.class)
      .readValue(json);

    assertEquals("My bean", bean.name);
    assertEquals("val2", bean.getProperties().get("attr2"));
}
```

### ```@JsonSetter```

```@JsonSetter``` is an alternative to ```@JsonProperty``` – used to mark the method as a setter method.

This is super useful when we need to read some JSON data but the target entity class doesn\'t exactly match that data and so we need to tune the process to make it fit.

In the following example, we\'ll specify the method setTheName() as the setter of the name property in our MyBean entity:


``` java
public class MyBean {
    public int id;
    private String name;

    @JsonSetter("name")
    public void setTheName(String name) {
        this.name = name;
    }
}
```

Now, when we need to unmarshall some JSON data – this works perfectly well:


``` java
@Test
public void whenDeserializingUsingJsonSetter_thenCorrect()
  throws IOException {

    String json = "{\"id\":1,\"name\":\"My bean\"}";

    MyBean bean = new ObjectMapper()
      .readerFor(MyBean.class)
      .readValue(json);
    assertEquals("My bean", bean.getTheName());
}
```

### ```@JsonDeserialize```

```@JsonDeserialize``` is used to indicate __the use of a custom deserializer__.

Let\'s see how that plays out – we\'ll use ```@JsonDeserialize``` to deserialize the eventDate property with the CustomDateDeserializer:


``` java
public class Event {
    public String name;

    @JsonDeserialize(using = CustomDateDeserializer.class)
    public Date eventDate;
}
```

Here\'s the custom deserializer:


``` java
public class CustomDateDeserializer
  extends StdDeserializer<Date> {

    private static SimpleDateFormat formatter
      = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");

    public CustomDateDeserializer() {
        this(null);
    }

    public CustomDateDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Date deserialize(
      JsonParser jsonparser, DeserializationContext context)
      throws IOException {

        String date = jsonparser.getText();
        try {
            return formatter.parse(date);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
```

And here\'s the back-to-back test:


``` java
@Test
public void whenDeserializingUsingJsonDeserialize_thenCorrect()
  throws IOException {

    String json
      = "{"name":"party","eventDate":"20-12-2014 02:30:00"}";

    SimpleDateFormat df
      = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
    Event event = new ObjectMapper()
      .readerFor(Event.class)
      .readValue(json);

    assertEquals(
      "20-12-2014 02:30:00", df.format(event.eventDate));
}
```

## Jackson Property Inclusion Annotations

### ```@JsonIgnoreProperties```

```@JsonIgnoreProperties``` – one of the most common annotations in Jackson – is used to mark a property or a list of properties to be ignored at the class level.

Let\'s go over a quick example ignoring the property id from serialization:


``` java
@JsonIgnoreProperties({ "id" })
public class BeanWithIgnore {
    public int id;
    public String name;
}
```

And here\'s the test making sure the ignore happens:


``` java
@Test
public void whenSerializingUsingJsonIgnoreProperties_thenCorrect()
  throws JsonProcessingException {

    BeanWithIgnore bean = new BeanWithIgnore(1, "My bean");

    String result = new ObjectMapper()
      .writeValueAsString(bean);

    assertThat(result, containsString("My bean"));
    assertThat(result, not(containsString("id")));
}
```

### ```@JsonIgnore```

The ```@JsonIgnore``` annotation is used to mark a property to be ignored at the field level.

Let\'s use ```@JsonIgnore``` to ignore the property id from serialization:


``` java
public class BeanWithIgnore {
    @JsonIgnore
    public int id;

    public String name;
}
```

And the test making sure that id was successfully ignored:


``` java
@Test
public void whenSerializingUsingJsonIgnore_thenCorrect()
  throws JsonProcessingException {

    BeanWithIgnore bean = new BeanWithIgnore(1, "My bean");

    String result = new ObjectMapper()
      .writeValueAsString(bean);

    assertThat(result, containsString("My bean"));
    assertThat(result, not(containsString("id")));
}
```

### ```@JsonIgnoreType```

```@JsonIgnoreType``` is used to mark all properties of annotated type to be ignored.

Let\'s use the annotation to mark all properties of type Name to be ignored:


``` java
public class User {
    public int id;
    public Name name;

    @JsonIgnoreType
    public static class Name {
        public String firstName;
        public String lastName;
    }
}
```

Here\'s the simple test making sure the ignore works correctly:


``` java
@Test
public void whenSerializingUsingJsonIgnoreType_thenCorrect()
  throws JsonProcessingException, ParseException {

    User.Name name = new User.Name("John", "Doe");
    User user = new User(1, name);

    String result = new ObjectMapper()
      .writeValueAsString(user);

    assertThat(result, containsString("1"));
    assertThat(result, not(containsString("name")));
    assertThat(result, not(containsString("John")));
}
```

### ```@JsonInclude```

```@JsonInclude``` is used to __exclude properties with empty/null/default values__.

Let\'s look at an example – excluding nulls from serialization:


``` java
@JsonInclude(Include.NON_NULL)
public class MyBean {
    public int id;
    public String name;
}
```

Here\'s the full test:


``` java
public void whenSerializingUsingJsonInclude_thenCorrect()
  throws JsonProcessingException {

    MyBean bean = new MyBean(1, null);

    String result = new ObjectMapper()
      .writeValueAsString(bean);

    assertThat(result, containsString("1"));
    assertThat(result, not(containsString("name")));
}
```

### ```@JsonAutoDetect```

```@JsonAutoDetect``` is used to override the default semantics of which properties are visible and which are not.

Let\'s take a look at how the annotation can be very helpful with a simple example – let\'s enable serializing private properties:


``` java
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class PrivateBean {
    private int id;
    private String name;
}
```

And the test:


``` java
@Test
public void whenSerializingUsingJsonAutoDetect_thenCorrect()
  throws JsonProcessingException {

    PrivateBean bean = new PrivateBean(1, "My bean");

    String result = new ObjectMapper()
      .writeValueAsString(bean);

    assertThat(result, containsString("1"));
    assertThat(result, containsString("My bean"));
}
```

## Jackson Polymorphic Type Handling Annotations

Next – let\'s take a look at Jackson polymorphic type handling annotations:

* ```@JsonTypeInfo``` is used to indicate details of what type information is included in serialization
* ```@JsonSubTypes``` is used to indicate sub-types of annotated type
* ```@JsonTypeName``` is used to define logical type name to use for annotated class

Let\'s look over a more complex example and use all three – @JsonTypeInfo, ```@JsonSubTypes``` and ```@JsonTypeName``` – to serialize/deserialize the entity Zoo:


``` java
public class Zoo {
    public Animal animal;

    @JsonTypeInfo(
      use = JsonTypeInfo.Id.NAME,
      include = As.PROPERTY,
      property = "type")
    @JsonSubTypes({
        @JsonSubTypes.Type(value = Dog.class, name = "dog"),
        @JsonSubTypes.Type(value = Cat.class, name = "cat")
    })
    public static class Animal {
        public String name;
    }

    @JsonTypeName("dog")
    public static class Dog extends Animal {
        public double barkVolume;
    }

    @JsonTypeName("cat")
    public static class Cat extends Animal {
        boolean likesCream;
        public int lives;
    }
}
```

When we do serialization:


``` java
@Test
public void whenSerializingPolymorphic_thenCorrect()
  throws JsonProcessingException {
    Zoo.Dog dog = new Zoo.Dog("lacy");
    Zoo zoo = new Zoo(dog);

    String result = new ObjectMapper()
      .writeValueAsString(zoo);

    assertThat(result, containsString("type"));
    assertThat(result, containsString("dog"));
}
```

Here\'s what serializing the Zoo instance with the Dog will result in:


``` json
{
    "animal": {
        "type": "dog",
        "name": "lacy",
        "barkVolume": 0
    }
}
```

Now for de-serialization – let\'s start from the following JSON input:


``` json
{
    "animal":{
        "name":"lacy",
        "type":"cat"
    }
}
```

And let\'s see how that gets unmarshalled to a Zoo instance:

11

``` java
@Test
public void whenDeserializingPolymorphic_thenCorrect()
throws IOException {
    String json = "{\"animal\":{\"name\":\"lacy\",\"type\":\"cat\"}}";

    Zoo zoo = new ObjectMapper()
      .readerFor(Zoo.class)
      .readValue(json);

    assertEquals("lacy", zoo.animal.name);
    assertEquals(Zoo.Cat.class, zoo.animal.getClass());
}
```

## Jackson General Annotations

Next – let\'s discuss some of Jackson more general annotations.

## @JsonProperty

```@JsonProperty``` is used to indicate __the property name in JSON__.

Let\'s go over the annotation with a simple example – and use ```@JsonProperty``` to serialize/deserialize the property name when we\'re dealing with non-standard getters and setters:

``` java
public class MyBean {
    public int id;
    private String name;

    @JsonProperty("name")
    public void setTheName(String name) {
        this.name = name;
    }

    @JsonProperty("name")
    public String getTheName() {
        return name;
    }
}
```

Our test:

``` java
@Test
public void whenUsingJsonProperty_thenCorrect()
  throws IOException {
    MyBean bean = new MyBean(1, "My bean");

    String result = new ObjectMapper().writeValueAsString(bean);

    assertThat(result, containsString("My bean"));
    assertThat(result, containsString("1"));

    MyBean resultBean = new ObjectMapper()
      .readerFor(MyBean.class)
      .readValue(result);
    assertEquals("My bean", resultBean.getTheName());
}
```

### ```@JsonFormat```

The ```@JsonFormat``` annotation can be used to __specify a format when serializing Date/Time values__.

In the following example – we use ```@JsonFormat``` to control the format of the property eventDate:

``` java
public class Event {
    public String name;

    @JsonFormat(
      shape = JsonFormat.Shape.STRING,
      pattern = "dd-MM-yyyy hh:mm:ss")
    public Date eventDate;
}
```

And here\'s the test:

``` java
@Test
public void whenSerializingUsingJsonFormat_thenCorrect()
  throws JsonProcessingException, ParseException {
    SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
    df.setTimeZone(TimeZone.getTimeZone("UTC"));

    String toParse = "20-12-2014 02:30:00";
    Date date = df.parse(toParse);
    Event event = new Event("party", date);

    String result = new ObjectMapper().writeValueAsString(event);

    assertThat(result, containsString(toParse));
}
```

### ```@JsonUnwrapped```

```@JsonUnwrapped``` is used to define that __a value should be unwrapped/flattened when serialized__.

Let\'s see exactly how that works; we\'ll use the annotation to unwrap the property name:

``` java
public class UnwrappedUser {
    public int id;

    @JsonUnwrapped
    public Name name;

    public static class Name {
        public String firstName;
        public String lastName;
    }
}
```

Let\'s now serialize an instance of this class:

``` java
@Test
public void whenSerializingUsingJsonUnwrapped_thenCorrect()
  throws JsonProcessingException, ParseException {
    UnwrappedUser.Name name = new UnwrappedUser.Name("John", "Doe");
    UnwrappedUser user = new UnwrappedUser(1, name);

    String result = new ObjectMapper().writeValueAsString(user);

    assertThat(result, containsString("John"));
    assertThat(result, not(containsString("name")));
}
```

Here\'s how the output looks like – the fields of the static nested class unwrapped along with the other field:

``` json
{
    "id":1,
    "firstName":"John",
    "lastName":"Doe"
}
```

### ```@JsonView```

```@JsonView``` is used to __indicate the View__ in which the property will be included for serialization/deserialization.

An example will show exactly how that works – we\'ll use ```@JsonView``` to serialize an instance of Item entity.

Let\'s start with the views:


``` java
public class Views {
    public static class Public {}
    public static class Internal extends Public {}
}
```

And now here\'s the Item entity, using the views:

``` java
public class Item {
    @JsonView(Views.Public.class)
    public int id;

    @JsonView(Views.Public.class)
    public String itemName;

    @JsonView(Views.Internal.class)
    public String ownerName;
}
```

Finally – the full test:

``` java
@Test
public void whenSerializingUsingJsonView_thenCorrect()
  throws JsonProcessingException {
    Item item = new Item(2, "book", "John");

    String result = new ObjectMapper()
      .writerWithView(Views.Public.class)
      .writeValueAsString(item);

    assertThat(result, containsString("book"));
    assertThat(result, containsString("2"));
    assertThat(result, not(containsString("John")));
}
```

### ```@JsonManagedReference, @JsonBackReference```

The ```@JsonManagedReference``` and ```@JsonBackReference``` annotations are used to handle parent/child relationships and work around loops.

In the following example – we use ```@JsonManagedReference``` and ```@JsonBackReference``` to serialize our ItemWithRef entity:

``` java
public class ItemWithRef {
    public int id;
    public String itemName;

    @JsonManagedReference
    public UserWithRef owner;
}
```

Our UserWithRef entity:

``` java
public class UserWithRef {
    public int id;
    public String name;

    @JsonBackReference
    public List<ItemWithRef> userItems;
}
```

And the test:

``` java
@Test
public void whenSerializingUsingJacksonReferenceAnnotation_thenCorrect()
  throws JsonProcessingException {
    UserWithRef user = new UserWithRef(1, "John");
    ItemWithRef item = new ItemWithRef(2, "book", user);
    user.addItem(item);

    String result = new ObjectMapper().writeValueAsString(item);

    assertThat(result, containsString("book"));
    assertThat(result, containsString("John"));
    assertThat(result, not(containsString("userItems")));
}
```

### ```@JsonIdentityInfo```

```@JsonIdentityInfo``` is used to indicate that Object Identity is to be used when serializing/deserializing values – for instance, to deal with infinite recursion type of problems.

In the following example – we have an ItemWithIdentity entity with __a bidirectional relationship__ with the UserWithIdentity entity:

``` java
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class ItemWithIdentity {
    public int id;
    public String itemName;
    public UserWithIdentity owner;
}
```

And the UserWithIdentity entity:

``` java
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class UserWithIdentity {
    public int id;
    public String name;
    public List<ItemWithIdentity> userItems;
}
```

Now, let\'s see how the infinite recursion problem is handled:

``` java
@Test
public void whenSerializingUsingJsonIdentityInfo_thenCorrect()
  throws JsonProcessingException {
    UserWithIdentity user = new UserWithIdentity(1, "John");
    ItemWithIdentity item = new ItemWithIdentity(2, "book", user);
    user.addItem(item);

    String result = new ObjectMapper().writeValueAsString(item);

    assertThat(result, containsString("book"));
    assertThat(result, containsString("John"));
    assertThat(result, containsString("userItems"));
}
```

Here\'s the full output of the serialized item and user:

``` json
{
    "id": 2,
    "itemName": "book",
    "owner": {
        "id": 1,
        "name": "John",
        "userItems": [
            2
        ]
    }
}
```

### ```@JsonFilter```

The ```@JsonFilter``` annotation __specifies a filter to be used during serialization__.

Let\'s take a look at an example; first, we define the entity and we point to the filter:

``` java
@JsonFilter("myFilter")
public class BeanWithFilter {
    public int id;
    public String name;
}
```

Now, in the full test, we define the filter – which excludes all other properties except name from serialization:

``` java
@Test
public void whenSerializingUsingJsonFilter_thenCorrect()
  throws JsonProcessingException {
    BeanWithFilter bean = new BeanWithFilter(1, "My bean");

    FilterProvider filters
      = new SimpleFilterProvider().addFilter(
        "myFilter",
        SimpleBeanPropertyFilter.filterOutAllExcept("name"));

    String result = new ObjectMapper()
      .writer(filters)
      .writeValueAsString(bean);

    assertThat(result, containsString("My bean"));
    assertThat(result, not(containsString("id")));
}
```

## Custom Jackson Annotation

Next – let\'s see how to create __a custom Jackson annotation__; we can make use of the ```@JacksonAnnotationsInside``` annotation – as in the following example:

``` java
@Retention(RetentionPolicy.RUNTIME)
    @JacksonAnnotationsInside
    @JsonInclude(Include.NON_NULL)
    @JsonPropertyOrder({ "name", "id", "dateCreated" })
    public ```@interface``` CustomAnnotation {}
```

Now, if we use the new annotation on an entity:

``` java
@CustomAnnotation
public class BeanWithCustomAnnotation {
    public int id;
    public String name;
    public Date dateCreated;
}
```

We can see how it does combine the existing annotations into a simpler, custom one that we can use as a shorthand:

``` java
@Test
public void whenSerializingUsingCustomAnnotation_thenCorrect()
  throws JsonProcessingException {
    BeanWithCustomAnnotation bean
      = new BeanWithCustomAnnotation(1, "My bean", null);

    String result = new ObjectMapper().writeValueAsString(bean);

    assertThat(result, containsString("My bean"));
    assertThat(result, containsString("1"));
    assertThat(result, not(containsString("dateCreated")));
}
```

The output of the serialization process:

``` json
{
    "name":"My bean",
    "id":1
}
```

## Jackson MixIn Annotations

Next – let\'s see how to use Jackson MixIn annotations.

Let\'s use the MixIn annotations to – for example – ignore properties of type User:

``` java
public class Item {
    public int id;
    public String itemName;
    public User owner;
}
```


``` java
@JsonIgnoreType
public class MyMixInForIgnoreType {}
```

Let\'s see this in action:

``` java
@Test
public void whenSerializingUsingMixInAnnotation_thenCorrect()
  throws JsonProcessingException {
    Item item = new Item(1, "book", null);

    String result = new ObjectMapper().writeValueAsString(item);
    assertThat(result, containsString("owner"));

    ObjectMapper mapper = new ObjectMapper();
    mapper.addMixIn(User.class, MyMixInForIgnoreType.class);

    result = mapper.writeValueAsString(item);
    assertThat(result, not(containsString("owner")));
}
```

### Disable Jackson Annotation

Finally – let\'s see how we can disable all Jackson annotations.We can do this by disabling the MapperFeature.USE_ANNOTATIONS as in the following example:

``` java
@JsonInclude(Include.NON_NULL)
@JsonPropertyOrder({ "name", "id" })
public class MyBean {
    public int id;
    public String name;
}
```

Now, after disabling annotations, these should have no effect and the defaults of the library should apply:

``` java
@Test
public void whenDisablingAllAnnotations_thenAllDisabled()
  throws IOException {
    MyBean bean = new MyBean(1, null);

    ObjectMapper mapper = new ObjectMapper();
    mapper.disable(MapperFeature.USE_ANNOTATIONS);
    String result = mapper.writeValueAsString(bean);

    assertThat(result, containsString("1"));
    assertThat(result, containsString("name"));
}
```

The result of serialization before disabling annotations:

``` json
{"id":1}
```
The result of serialization after disabling annotations:

``` json
{
    "id":1,
    "name":null
}
```

### Conclusion

This tutorial has been a deep-dive into Jackson annotations, just scratching the surface of the kind of flexibility you can get using them properly.

The implementation of all these examples and code snippets can be found in the GitHub project – this is a Maven-based project, so it should be easy to import and run as it is.
