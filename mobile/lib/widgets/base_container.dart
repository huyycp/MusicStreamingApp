import 'package:flutter/widgets.dart';
import 'package:mobile/theme/color_scheme.dart';

class BaseContainer extends StatelessWidget {
  Widget? child;
  EdgeInsets? padding;
  BaseContainer({
    this.child, 
    this.padding = const EdgeInsets.symmetric(horizontal: 16), 
    super.key
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Container(
        padding: padding,
        color: PRIMARY_BACKGROUND,
        child: child,
      ),
    );
  }
}