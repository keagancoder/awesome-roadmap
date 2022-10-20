# MVC MVP MVVM

模型-视图-控制器，或MVC，是一种用于分离用户界面、数据和应用逻辑的模式。
它通过将一个应用程序分成三个部分来实现。模型、视图和控制器。模型持有数据，视图包含了用户界面，而控制器则作为两者之间的中介。

模型-视图-控制器，或称MVP，被设计用来简化自动单元测试，并改善表现逻辑中的关注点分离。MVP是MVC模式的一个变种，但不同的是，它将应用程序分为用户界面（视图）、数据（模型）和表现逻辑（演示器）。虽然模型和视图的表示与模型-视图-控制器模式相同，但演示者与控制器的不同之处在于它操作模型并更新视图。

MVC的另一个变体是模型-视图-视图模型模式。模型-视图-视图模型，或MVVM，将应用程序分成三个核心部分。模型、视图、和视图模型。虽然视图和模型代表了它们在上级模式中的所有内容，但视图模型作为模型和视图之间的链接，从模型中检索数据并通过双向数据绑定将其暴露给视图，并且可以操作模型的数据。

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/@ankit.sinhal/mvc-mvp-and-mvvm-design-pattern-6e169567bbad'>MVC, MVP and MVVM Design Pattern</BadgeLink>
